using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/{bookId}/classifications")]
    [EnableCors("AllowAll")]
    public class ClassificationsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public ClassificationsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetClassifications(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
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
            var endpoint = "classifications";
            if (queryParameters.Any())
            {
                endpoint = $"{endpoint}?{string.Join("&", queryParameters)}";
            }
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{classificationId}")]
        public async Task<IActionResult> GetClassificationById(string bookId, string classificationId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateClassification(string bookId, [FromBody] object classificationRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(classificationRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "classifications", HttpMethod.Post, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{classificationId}")]
        public async Task<IActionResult> DeleteClassification(string bookId, string classificationId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Delete);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{classificationId}")]
        public async Task<IActionResult> UpdateClassification(string bookId, string classificationId, [FromBody] object classificationRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(classificationRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Put, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
