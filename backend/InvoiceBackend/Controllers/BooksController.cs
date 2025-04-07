using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BooksController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public BooksController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.GetBooksAsync(sessionId);

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
