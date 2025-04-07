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
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

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

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomerById(string bookId, string customerId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(string bookId, [FromBody] object customerRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "customers", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer(string bookId, string customerId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{customerId}")]
        public async Task<IActionResult> UpdateCustomer(string bookId, string customerId, [FromBody] object customerRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}