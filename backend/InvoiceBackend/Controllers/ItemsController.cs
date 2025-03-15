using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/{bookId}/items")]
    [EnableCors("AllowAll")]
    public class ItemsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public ItemsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetItems(string bookId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "items", HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{itemId}")]
        public async Task<IActionResult> GetItemById(string bookId, string itemId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(string bookId, [FromBody] object itemRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(itemRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "items", HttpMethod.Post, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteItem(string bookId, string itemId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Delete);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{itemId}")]
        public async Task<IActionResult> UpdateItem(string bookId, string itemId, [FromBody] object itemRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(itemRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Put, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
