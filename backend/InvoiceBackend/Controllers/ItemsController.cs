using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/items")]
    [EnableCors("AllowAll")]
    public class ItemsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public ItemsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetItems(string bookId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "items", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response); ;
        }
    }
}
