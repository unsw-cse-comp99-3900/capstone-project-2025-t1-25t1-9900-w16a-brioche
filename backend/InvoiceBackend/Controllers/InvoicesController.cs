using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using InvoiceBackend.Services.ReckonApiService;
using InvoiceBackend.Helpers;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/{bookId}/invoices")]
    [EnableCors("AllowAll")]
    public class InvoicesController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public InvoicesController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetInvoices(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
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
            var endpoint = "invoices";
            if (queryParameters.Any())
            {
                endpoint = $"{endpoint}?{string.Join("&", queryParameters)}";
            }
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GetInvoiceById(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{invoiceId}/history")]
        public async Task<IActionResult> GetInvoiceHistory(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/history", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost("{invoiceId}/email")]
        public async Task<IActionResult> SendInvoiceEmail(string bookId, string invoiceId, [FromBody] object emailRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(emailRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/email", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice(string bookId, [FromBody] object invoiceRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "invoices", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{invoiceId}")]
        public async Task<IActionResult> UpdateInvoice(string bookId, string invoiceId, [FromBody] object invoiceRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{invoiceId}")]
        public async Task<IActionResult> DeleteInvoice(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{invoiceId}/pdf")]
        public async Task<IActionResult> GetInvoicePdf(string bookId, string invoiceId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

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