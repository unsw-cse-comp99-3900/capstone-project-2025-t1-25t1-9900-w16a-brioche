﻿using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/customers")]
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
            
            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{bookId}/{customerId}")]
        public async Task<IActionResult> GetCustomerById(string bookId, string customerId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> CreateCustomer(string bookId, [FromBody] object customerRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "customers", HttpMethod.Post, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{bookId}/{customerId}")]
        public async Task<IActionResult> DeleteCustomer(string bookId, string customerId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Delete);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{bookId}/{customerId}")]
        public async Task<IActionResult> UpdateCustomer(string bookId, string customerId, [FromBody] object customerRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(customerRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"customers/{customerId}", HttpMethod.Put, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
