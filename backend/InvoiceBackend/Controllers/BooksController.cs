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
            HttpResponseMessage response = await _apiService.GetBooksAsync();
            string responseText = await response.Content.ReadAsStringAsync();

            return StatusCode((int)response.StatusCode, responseText);
        }
    }
}
