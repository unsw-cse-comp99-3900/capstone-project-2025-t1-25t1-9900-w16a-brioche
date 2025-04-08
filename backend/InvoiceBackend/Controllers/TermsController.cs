using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/{bookId}/terms")]
    [EnableCors("AllowAll")]
    public class TermsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public TermsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTerms(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
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
            var endpoint = "terms";
            if (queryParameters.Any())
            {
                endpoint = $"{endpoint}?{string.Join("&", queryParameters)}";
            }

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{termId}")]
        public async Task<IActionResult> GetTermById(string bookId, string termId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTerm(string bookId, [FromBody] object termRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(termRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "terms", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{termId}")]
        public async Task<IActionResult> DeleteTerm(string bookId, string termId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{termId}")]
        public async Task<IActionResult> UpdateTerm(string bookId, string termId, [FromBody] object termRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            string requestBody = System.Text.Json.JsonSerializer.Serialize(termRequestBody);
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{termId}/duedate/basedate/{baseDate}")]
        public async Task<IActionResult> CalculateDueDate(string bookId, string termId, string baseDate)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}/duedate/basedate/{baseDate}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}