using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for managing customers within a specific Reckon One book.
    /// </summary>
    [ApiController]
    [Route("api/{bookId}/customers")]
    [EnableCors("AllowAll")]
    public class CustomersController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomersController"/> class.
        /// </summary>
        /// <param name="apiService">Service used to communicate with the Reckon One API.</param>
        public CustomersController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        /// <summary>
        /// Retrieves a paginated list of customers for the specified book.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="page">The page number to retrieve (optional).</param>
        /// <param name="perpage">The number of customers per page (optional).</param>
        /// <returns>A list of customers or an appropriate error response.</returns>
        /// <response code="200">Successfully retrieved the customers.</response>
        /// <response code="400">Missing session ID or invalid parameters.</response>
        [HttpGet]
        public async Task<IActionResult> GetCustomers(string bookId, [FromQuery] int? page, [FromQuery] int? perpage)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            var queryParameters = new List<string>();
            if (page.HasValue) queryParameters.Add($"page={page.Value}");
            if (perpage.HasValue) queryParameters.Add($"perpage={perpage.Value}");

            var endpoint = "customers";
            if (queryParameters.Any()) endpoint += $"?{string.Join("&", queryParameters)}";

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, endpoint, HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Retrieves a specific customer by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="customerId">The ID of the customer to retrieve.</param>
        /// <returns>The requested customer or an error message.</returns>
        /// <response code="200">Successfully retrieved the customer.</response>
        /// <response code="400">Missing session ID or invalid customer ID.</response>
        /// <response code="404">Customer not found.</response>
        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomerById(string bookId, string customerId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Get, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Creates a new customer in the specified book.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="customerRequestBody">The customer data to create.</param>
        /// <returns>The created customer or an error response.</returns>
        /// <response code="201">Customer created successfully.</response>
        /// <response code="400">Invalid request body or missing session ID.</response>
        [HttpPost]
        public async Task<IActionResult> CreateCustomer(string bookId, [FromBody] object customerRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();
            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "customers", HttpMethod.Post, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Deletes a customer by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="customerId">The ID of the customer to delete.</param>
        /// <returns>No content on success or an appropriate error response.</returns>
        /// <response code="204">Customer deleted successfully.</response>
        /// <response code="400">Missing session ID or invalid customer ID.</response>
        /// <response code="404">Customer not found.</response>
        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer(string bookId, string customerId)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Delete, sessionId);
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        /// <summary>
        /// Updates an existing customer by ID.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <param name="customerId">The ID of the customer to update.</param>
        /// <param name="customerRequestBody">The updated customer data.</param>
        /// <returns>The updated customer or an appropriate error response.</returns>
        /// <response code="200">Customer updated successfully.</response>
        /// <response code="400">Invalid data or missing session ID.</response>
        /// <response code="404">Customer not found.</response>
        [HttpPut("{customerId}")]
        public async Task<IActionResult> UpdateCustomer(string bookId, string customerId, [FromBody] object customerRequestBody)
        {
            if (!Request.Headers.TryGetValue("X-Session-ID", out var sessionIdValues) || string.IsNullOrEmpty(sessionIdValues))
            {
                return BadRequest(new { message = "Session ID is required" });
            }

            string sessionId = sessionIdValues.ToString();
            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Put, sessionId, requestBody);
            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
