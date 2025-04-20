using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for managing ledger accounts within a specific Reckon One book.
    /// </summary>
    [ApiController]
    [Route("api/{bookId}/ledgeraccounts")]
    [EnableCors("AllowAll")]
    public class LedgerAccountsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        /// <summary>
        /// Initializes a new instance of the <see cref="LedgerAccountsController"/> class.
        /// </summary>
        /// <param name="apiService">Service for interacting with the Reckon One API.</param>
        public LedgerAccountsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        /// <summary>
        /// Retrieves a paginated list of ledger accounts.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="page">Optional page number for pagination.</param>
        /// <param name="perpage">Optional page size for pagination.</param>
        /// <returns>A list of ledger accounts or an appropriate error response.</returns>
        [HttpGet]
        public async Task<IActionResult> GetLedgerAccounts(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            var queryParameters = new List<string>();
            if (page.HasValue) queryParameters.Add($"page={page.Value}");
            if (perpage.HasValue) queryParameters.Add($"perpage={perpage.Value}");

            var endpoint = "ledgeraccounts";
            if (queryParameters.Any())
                endpoint += $"?{string.Join("&", queryParameters)}";

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves a specific ledger account by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="ledgerAccountId">The ID of the ledger account.</param>
        /// <returns>The requested ledger account or an appropriate error response.</returns>
        [HttpGet("{ledgerAccountId}")]
        public async Task<IActionResult> GetLedgerAccountById(string bookId, string ledgerAccountId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"ledgeraccounts/{ledgerAccountId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Creates a new ledger account.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="ledgerAccountRequestBody">The ledger account data in JSON format.</param>
        /// <returns>The created ledger account or an appropriate error response.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateLedgerAccount(string bookId, [FromBody] object ledgerAccountRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(ledgerAccountRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "ledgeraccounts", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Deletes a ledger account by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="ledgerAccountId">The ID of the ledger account to delete.</param>
        /// <returns>No content if successful, or an appropriate error response.</returns>
        [HttpDelete("{ledgerAccountId}")]
        public async Task<IActionResult> DeleteLedgerAccount(string bookId, string ledgerAccountId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"ledgeraccounts/{ledgerAccountId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Updates an existing ledger account.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="ledgerAccountId">The ID of the ledger account to update.</param>
        /// <param name="ledgerAccountRequestBody">The updated ledger account data in JSON format.</param>
        /// <returns>The updated ledger account or an appropriate error response.</returns>
        [HttpPut("{ledgerAccountId}")]
        public async Task<IActionResult> UpdateLedgerAccount(string bookId, string ledgerAccountId, [FromBody] object ledgerAccountRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(ledgerAccountRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"ledgeraccounts/{ledgerAccountId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
