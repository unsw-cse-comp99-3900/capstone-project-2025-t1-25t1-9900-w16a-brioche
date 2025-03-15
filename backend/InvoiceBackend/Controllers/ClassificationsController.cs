using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/classifications")]
    [EnableCors("AllowAll")]
    public class ClassificationsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public ClassificationsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetClassifications(string bookId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "classifications", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{bookId}/{classificationId}")]
        public async Task<IActionResult> GetClassificationById(string bookId, string classificationId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> CreateClassification(string bookId, [FromBody] object classificationRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(classificationRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "classifications", HttpMethod.Post, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{bookId}/{classificationId}")]
        public async Task<IActionResult> DeleteClassification(string bookId, string classificationId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Delete);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{bookId}/{classificationId}")]
        public async Task<IActionResult> UpdateClassification(string bookId, string classificationId, [FromBody] object classificationRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(classificationRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Put, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
