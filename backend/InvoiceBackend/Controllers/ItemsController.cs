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
        public async Task<IActionResult> GetItems(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
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
            var endpoint = "items";
            if (queryParameters.Any())
            {
                endpoint = $"{endpoint}?{string.Join("&", queryParameters)}";
            }
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{itemId}")]
        public async Task<IActionResult> GetItemById(string bookId, string itemId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(string bookId, [FromBody] object itemRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(itemRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "items", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteItem(string bookId, string itemId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{itemId}")]
        public async Task<IActionResult> UpdateItem(string bookId, string itemId, [FromBody] object itemRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(itemRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}