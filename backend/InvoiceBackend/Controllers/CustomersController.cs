using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/{bookId}/customers")]
    [EnableCors("AllowAll")]
    public class CustomersController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public CustomersController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomers(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
        {
            var queryParameters = new List<string>();

            if (page.HasValue)
            {
                queryParameters.Add($"page={page.Value}");
            }

            if (perpage.HasValue)
            {
                queryParameters.Add($"perpage={perpage.Value}");
            }

            var endpoint = "customers";
            if (queryParameters.Any())
            {
                endpoint = $"{endpoint}?{string.Join("&", queryParameters)}";
            }

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomerById(string bookId, string customerId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(string bookId, [FromBody] object customerRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "customers", HttpMethod.Post, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer(string bookId, string customerId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Delete);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{customerId}")]
        public async Task<IActionResult> UpdateCustomer(string bookId, string customerId, [FromBody] object customerRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Put, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
