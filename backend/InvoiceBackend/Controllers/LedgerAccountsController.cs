using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/{bookId}/ledgeraccounts")]
    [EnableCors("AllowAll")]
    public class LedgerAccountsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public LedgerAccountsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetLedgerAccounts(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
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
            var endpoint = "ledgeraccounts";
            if (queryParameters.Any())
            {
                endpoint = $"{endpoint}?{string.Join("&", queryParameters)}";
            }
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{ledgerAccountId}")]
        public async Task<IActionResult> GetLedgerAccountById(string bookId, string ledgerAccountId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"ledgeraccounts/{ledgerAccountId}", HttpMethod.Get);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLedgerAccount(string bookId, [FromBody] object ledgerAccountRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(ledgerAccountRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "ledgeraccounts", HttpMethod.Post, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{ledgerAccountId}")]
        public async Task<IActionResult> DeleteLedgerAccount(string bookId, string ledgerAccountId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"ledgeraccounts/{ledgerAccountId}", HttpMethod.Delete);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{ledgerAccountId}")]
        public async Task<IActionResult> UpdateLedgerAccount(string bookId, string ledgerAccountId, [FromBody] object ledgerAccountRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(ledgerAccountRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"ledgeraccounts/{ledgerAccountId}", HttpMethod.Put, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
