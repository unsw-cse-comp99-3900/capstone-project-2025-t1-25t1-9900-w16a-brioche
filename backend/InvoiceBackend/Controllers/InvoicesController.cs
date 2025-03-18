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
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GetInvoiceById(string bookId, string invoiceId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{invoiceId}/history")]
        public async Task<IActionResult> GetInvoiceHistory(string bookId, string invoiceId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/history", HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost("{invoiceId}/email")]
        public async Task<IActionResult> SendInvoiceEmail(string bookId, string invoiceId, [FromBody] object emailRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(emailRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/email", HttpMethod.Post, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice(string bookId, [FromBody] object invoiceRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "invoices", HttpMethod.Post, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{invoiceId}")]
        public async Task<IActionResult> UpdateInvoice(string bookId, string invoiceId, [FromBody] object invoiceRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Put, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{invoiceId}")]
        public async Task<IActionResult> DeleteInvoice(string bookId, string invoiceId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Delete);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{invoiceId}/pdf")]
        public async Task<IActionResult> GetInvoicePdf(string bookId, string invoiceId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}?format=pdf", HttpMethod.Get);

            if (response.IsSuccessStatusCode)
            {
                byte[] pdfBytes = await response.Content.ReadAsByteArrayAsync();
                return File(pdfBytes, "application/pdf", $"invoice_{invoiceId}.pdf");
            }

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
