﻿using InvoiceBackend.Helpers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/terms")]
    [EnableCors("AllowAll")]
    public class TermsController : ControllerBase
    {
        private readonly IReckonApiService _apiService;

        public TermsController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetTerms(string bookId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "terms", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{bookId}/{termId}")]
        public async Task<IActionResult> GetTermById(string bookId, string termId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> CreateTerm(string bookId, [FromBody] object termRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(termRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "terms", HttpMethod.Post, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpDelete("{bookId}/{termId}")]
        public async Task<IActionResult> DeleteTerm(string bookId, string termId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Delete);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpPut("{bookId}/{termId}")]
        public async Task<IActionResult> UpdateTerm(string bookId, string termId, [FromBody] object termRequestBody)
        {
            string requestBody = System.Text.Json.JsonSerializer.Serialize(termRequestBody);

            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}", HttpMethod.Put, requestBody);

            return await ApiResponseHelper.HandleApiResponse(response);
        }

        [HttpGet("{bookId}/{termId}/{baseDate}")]
        public async Task<IActionResult> CalculateDueDate(string bookId, string termId, string baseDate)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, $"terms/{termId}/duedate/basedate/{baseDate}", HttpMethod.Get);

            return await ApiResponseHelper.HandleApiResponse(response);
        }
    }
}
