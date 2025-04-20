using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for managing payment terms within a specific Reckon One book.
    /// </summary>
    [ApiController]
    [Route("api/{bookId}/terms")]
    [EnableCors("AllowAll")]
    public class TermsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        /// <summary>
        /// Initializes a new instance of the <see cref="TermsController"/> class.
        /// </summary>
        /// <param name="apiService">Service used to interact with the Reckon One API.</param>
        public TermsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        /// <summary>
        /// Retrieves a paginated list of terms.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="page">Optional page number for pagination.</param>
        /// <param name="perpage">Optional page size for pagination.</param>
        /// <returns>A list of terms or an appropriate error response.</returns>
        [HttpGet]
        public async Task<IActionResult> GetTerms(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            var queryParameters = new List<string>();
            if (page.HasValue) queryParameters.Add($"page={page.Value}");
            if (perpage.HasValue) queryParameters.Add($"perpage={perpage.Value}");

            var endpoint = "terms";
            if (queryParameters.Any())
                endpoint += $"?{string.Join("&", queryParameters)}";

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves a specific term by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="termId">The ID of the term.</param>
        /// <returns>The term object or error response.</returns>
        [HttpGet("{termId}")]
        public async Task<IActionResult> GetTermById(string bookId, string termId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Creates a new payment term.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="termRequestBody">The term data (JSON object).</param>
        /// <returns>The created term or error response.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateTerm(string bookId, [FromBody] object termRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(termRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "terms", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Deletes a term by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="termId">The ID of the term to delete.</param>
        /// <returns>No content if successful, or an error response.</returns>
        [HttpDelete("{termId}")]
        public async Task<IActionResult> DeleteTerm(string bookId, string termId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Updates an existing term.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="termId">The ID of the term to update.</param>
        /// <param name="termRequestBody">The updated term data (JSON object).</param>
        /// <returns>The updated term or error response.</returns>
        [HttpPut("{termId}")]
        public async Task<IActionResult> UpdateTerm(string bookId, string termId, [FromBody] object termRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(termRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Calculates the due date for a specific term based on a base date.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="termId">The ID of the term.</param>
        /// <param name="baseDate">The base date to calculate the due date from (YYYY-MM-DD).</param>
        /// <returns>The calculated due date or error response.</returns>
        [HttpGet("{termId}/duedate/basedate/{baseDate}")]
        public async Task<IActionResult> CalculateDueDate(string bookId, string termId, string baseDate)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}/duedate/basedate/{baseDate}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
