using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/{bookId}")]
    [EnableCors("AllowAll")]
    public class CustomersController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public CustomersController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomers(string bookId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "customers", HttpMethod.Get);
            
            return await ApiResponseHelper.HandleApiResponse(response); ;
        }
    }
}
