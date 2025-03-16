using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace InvoiceBackend.Helpers
{
    public static class ApiResponseHelper
    {
        public static async Task<IActionResult> HandleApiResponse(HttpResponseMessage response)
        {
            string responseText = await response.Content.ReadAsStringAsync();

            return new ContentResult
            {
                StatusCode = (int)response.StatusCode,
                Content = responseText,
                ContentType = "application/json; charset=utf-8"
            };
        }
    }
}
