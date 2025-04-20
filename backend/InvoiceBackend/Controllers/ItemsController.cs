using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for managing items within a specific Reckon One book.
    /// </summary>
    [ApiController]
    [Route("api/{bookId}/items")]
    [EnableCors("AllowAll")]
    public class ItemsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ItemsController"/> class.
        /// </summary>
        /// <param name="apiService">Service used to communicate with the Reckon One API.</param>
        public ItemsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        /// <summary>
        /// Retrieves a paginated list of items.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="page">Optional page number.</param>
        /// <param name="perpage">Optional page size.</param>
        /// <returns>A list of items.</returns>
        [HttpGet]
        public async Task<IActionResult> GetItems(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            var queryParameters = new List<string>();
            if (page.HasValue) queryParameters.Add($"page={page.Value}");
            if (perpage.HasValue) queryParameters.Add($"perpage={perpage.Value}");

            var endpoint = "items";
            if (queryParameters.Any())
                endpoint += $"?{string.Join("&", queryParameters)}";

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves a specific item by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="itemId">The ID of the item.</param>
        /// <returns>The requested item object.</returns>
        [HttpGet("{itemId}")]
        public async Task<IActionResult> GetItemById(string bookId, string itemId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Creates a new item in the specified book.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="itemRequestBody">The item data to create (JSON object).</param>
        /// <returns>The created item or error response.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateItem(string bookId, [FromBody] object itemRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();
            string requestBody = System.Text.Json.JsonSerializer.Serialize(itemRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "items", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Deletes an item by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="itemId">The ID of the item to delete.</param>
        /// <returns>No content on success or error response.</returns>
        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteItem(string bookId, string itemId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Updates an existing item by replacing all fields.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="itemId">The ID of the item to update.</param>
        /// <param name="itemRequestBody">The updated item data (JSON object).</param>
        /// <returns>The updated item or error response.</returns>
        [HttpPut("{itemId}")]
        public async Task<IActionResult> UpdateItem(string bookId, string itemId, [FromBody] object itemRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();
            string requestBody = System.Text.Json.JsonSerializer.Serialize(itemRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"items/{itemId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
