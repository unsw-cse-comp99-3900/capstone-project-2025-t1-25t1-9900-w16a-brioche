using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for handling book-related operations with the Reckon One API.
    /// </summary>
    [ApiController]
    [Route("api/books")]
    public class BooksController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        /// <summary>
        /// Initializes a new instance of the <see cref="BooksController"/> class.
        /// </summary>
        /// <param name="apiService">Service for interacting with the Reckon One API.</param>
        public BooksController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        /// <summary>
        /// Retrieves the list of books associated with the authenticated Reckon One session.
        /// </summary>
        /// <returns>
        /// A list of books if the session is valid; otherwise, a <see cref="BadRequestResult"/> or appropriate error.
        /// </returns>
        /// <response code="200">Successfully retrieved the list of books.</response>
        /// <response code="400">Missing or invalid session ID in request header.</response>
        /// <response code="401">Unauthorized access to Reckon One API.</response>
        /// <response code="500">An error occurred while processing the request.</response>
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
