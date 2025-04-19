using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using InvoiceBackend.Services.ReckonApiService;
using InvoiceBackend.Helpers;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for managing invoices in a specified Reckon One book.
    /// </summary>
    [ApiController]
    [Route("api/{bookId}/invoices")]
    [EnableCors("AllowAll")]
    public class InvoicesController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        /// <summary>
        /// Initializes a new instance of the <see cref="InvoicesController"/> class.
        /// </summary>
        /// <param name="apiService">Service used to communicate with the Reckon One API.</param>
        public InvoicesController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        /// <summary>
        /// Retrieves a paginated list of invoices.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="page">Optional page number.</param>
        /// <param name="perpage">Optional page size.</param>
        /// <returns>A list of invoices.</returns>
        [HttpGet]
        public async Task<IActionResult> GetInvoices(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            var queryParameters = new List<string>();
            if (page.HasValue) queryParameters.Add($"page={page.Value}");
            if (perpage.HasValue) queryParameters.Add($"perpage={perpage.Value}");

            var endpoint = "invoices";
            if (queryParameters.Any())
                endpoint += $"?{string.Join("&", queryParameters)}";

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves a specific invoice by its ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceId">The ID of the invoice.</param>
        /// <returns>The invoice object.</returns>
        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GetInvoiceById(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves the history of a specific invoice.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceId">The ID of the invoice.</param>
        /// <returns>A history log of the invoice.</returns>
        [HttpGet("{invoiceId}/history")]
        public async Task<IActionResult> GetInvoiceHistory(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/history", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Sends the invoice to the customer via email.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceId">The ID of the invoice.</param>
        /// <param name="emailRequestBody">The email details (JSON object).</param>
        /// <returns>Email send result.</returns>
        [HttpPost("{invoiceId}/email")]
        public async Task<IActionResult> SendInvoiceEmail(string bookId, string invoiceId, [FromBody] object emailRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(emailRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/email", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Creates a new invoice.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceRequestBody">The invoice data (JSON object).</param>
        /// <returns>The created invoice.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateInvoice(string bookId, [FromBody] object invoiceRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "invoices", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Updates an existing invoice by replacing all fields.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceId">The ID of the invoice to update.</param>
        /// <param name="invoiceRequestBody">The updated invoice data.</param>
        /// <returns>The updated invoice.</returns>
        [HttpPut("{invoiceId}")]
        public async Task<IActionResult> UpdateInvoice(string bookId, string invoiceId, [FromBody] object invoiceRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Applies partial updates to an invoice.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceId">The ID of the invoice.</param>
        /// <param name="invoicePatchBody">The patch data.</param>
        /// <returns>The patched invoice.</returns>
        [HttpPatch("{invoiceId}")]
        public async Task<IActionResult> PatchInvoice(string bookId, string invoiceId, [FromBody] object invoicePatchBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoicePatchBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Patch, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Deletes an invoice by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceId">The ID of the invoice to delete.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{invoiceId}")]
        public async Task<IActionResult> DeleteInvoice(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves a PDF version of the invoice.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="invoiceId">The ID of the invoice.</param>
        /// <returns>A PDF file stream of the invoice.</returns>
        [HttpGet("{invoiceId}/pdf")]
        public async Task<IActionResult> GetInvoicePdf(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
                return BadRequest(new { message = "Session ID is required" });

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}?format=pdf", HttpMethod.Get, sessionId);

            if (response.IsSuccessStatusCode)
            {
                byte[] pdfBytes = await response.Content.ReadAsByteArrayAsync();
                return File(pdfBytes, "application/pdf", $"invoice_{invoiceId}.pdf");
            }

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
