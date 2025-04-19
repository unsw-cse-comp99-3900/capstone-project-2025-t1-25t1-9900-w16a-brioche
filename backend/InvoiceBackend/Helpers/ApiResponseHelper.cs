using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace InvoiceBackend.Helpers
{
    /// <summary>
    /// Helper class for handling standardized HTTP responses from external API calls (e.g., Reckon One).
    /// </summary>
    public static class ApiResponseHelper
    {
        /// <summary>
        /// Converts an <see cref="HttpResponseMessage"/> from an external API call into an <see cref="IActionResult"/> for ASP.NET Core.
        /// </summary>
        /// <param name="response">The <see cref="HttpResponseMessage"/> returned by the external API.</param>
        /// <returns>
        /// A <see cref="ContentResult"/> with the original status code, content body, and content type set to JSON.
        /// </returns>
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
