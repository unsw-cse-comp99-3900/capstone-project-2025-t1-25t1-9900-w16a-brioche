using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Net.Http.Headers;
using InvoiceBackend.Services.ReckonApiService;
using InvoiceBackend.Helpers;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/invoices")]
    [EnableCors("AllowAll")]
    public class InvoicesController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public InvoicesController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetInvoices(string bookId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "invoices", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response); ;
        }

        [HttpGet("{bookId}/{invoiceId}")]
        public async Task<IActionResult> GetInvoiceById(string bookId, string invoiceId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }


        [HttpGet("{bookId}/{invoiceId}/history")]
        public async Task<IActionResult> GetInvoiceHistory(string bookId, string invoiceId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/history", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost("{bookId}/{invoiceId}/email")]
        public async Task<IActionResult> SendInvoiceEmail(string bookId, string invoiceId, [FromBody] object emailRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(emailRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}/email", HttpMethod.Post, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> CreateInvoice(string bookId, [FromBody] object invoiceRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "invoices", HttpMethod.Post, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{bookId}/{invoiceId}")]
        public async Task<IActionResult> UpdateInvoice(string bookId, string invoiceId, [FromBody] object invoiceRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(invoiceRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Put, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{bookId}/{invoiceId}")]
        public async Task<IActionResult> DeleteInvoice(string bookId, string invoiceId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"invoices/{invoiceId}", HttpMethod.Delete);

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
