using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for handling classification-related operations within a specific Reckon One book.
    /// </summary>
    [ApiController]
    [Route("api/{bookId}/classifications")]
    [EnableCors("AllowAll")]
    public class ClassificationsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClassificationsController"/> class.
        /// </summary>
        /// <param name="apiService">Service used to communicate with the Reckon One API.</param>
        public ClassificationsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        /// <summary>
        /// Retrieves a paginated list of classifications for a given book.
        /// </summary>
        /// <param name="bookId">The ID of the book to retrieve classifications from.</param>
        /// <param name="page">The page number to fetch (optional).</param>
        /// <param name="perpage">The number of items per page (optional).</param>
        /// <returns>A list of classifications or an appropriate error message.</returns>
        /// <response code="200">Successfully retrieved classifications.</response>
        /// <response code="400">Missing session ID or invalid request parameters.</response>
        [HttpGet]
        public async Task<IActionResult> GetClassifications(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            var queryParameters = new List<string>();
            if (page.HasValue) queryParameters.Add($"page={page.Value}");
            if (perpage.HasValue) queryParameters.Add($"perpage={perpage.Value}");

            var endpoint = "classifications";
            if (queryParameters.Any()) endpoint += $"?{string.Join("&", queryParameters)}";

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves a specific classification by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book containing the classification.</param>
        /// <param name="classificationId">The ID of the classification to retrieve.</param>
        /// <returns>The requested classification object or an error.</returns>
        /// <response code="200">Successfully retrieved the classification.</response>
        /// <response code="400">Missing session ID or invalid ID.</response>
        /// <response code="404">Classification not found.</response>
        [HttpGet("{classificationId}")]
        public async Task<IActionResult> GetClassificationById(string bookId, string classificationId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Creates a new classification for the specified book.
        /// </summary>
        /// <param name="bookId">The ID of the book to add the classification to.</param>
        /// <param name="classificationRequestBody">The classification object to create.</param>
        /// <returns>The created classification or an error.</returns>
        /// <response code="201">Classification created successfully.</response>
        /// <response code="400">Invalid request body or missing session ID.</response>
        [HttpPost]
        public async Task<IActionResult> CreateClassification(string bookId, [FromBody] object classificationRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();
            string requestBody = System.Text.Json.JsonSerializer.Serialize(classificationRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "classifications", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Deletes a classification by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book containing the classification.</param>
        /// <param name="classificationId">The ID of the classification to delete.</param>
        /// <returns>No content on success, or an error response.</returns>
        /// <response code="204">Classification deleted successfully.</response>
        /// <response code="400">Invalid classification ID or missing session ID.</response>
        /// <response code="404">Classification not found.</response>
        [HttpDelete("{classificationId}")]
        public async Task<IActionResult> DeleteClassification(string bookId, string classificationId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Updates an existing classification by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book containing the classification.</param>
        /// <param name="classificationId">The ID of the classification to update.</param>
        /// <param name="classificationRequestBody">The updated classification data.</param>
        /// <returns>The updated classification or an error response.</returns>
        /// <response code="200">Classification updated successfully.</response>
        /// <response code="400">Invalid data or missing session ID.</response>
        /// <response code="404">Classification not found.</response>
        [HttpPut("{classificationId}")]
        public async Task<IActionResult> UpdateClassification(string bookId, string classificationId, [FromBody] object classificationRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();
            string requestBody = System.Text.Json.JsonSerializer.Serialize(classificationRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"classifications/{classificationId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
