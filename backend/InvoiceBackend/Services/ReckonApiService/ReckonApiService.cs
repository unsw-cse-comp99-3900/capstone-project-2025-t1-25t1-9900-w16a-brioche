// ReckonApiService.cs
using System.Net.Http.Headers;
using System.Text;
using InvoiceBackend.Services.ReckonTokenService;

namespace InvoiceBackend.Services.ReckonApiService
{
    public class ReckonApiService : IReckonApiService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IReckonTokenService _tokenService;

        public ReckonApiService(IConfiguration configuration, IReckonTokenService tokenService)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
            _tokenService = tokenService;
        }

        public async Task<HttpResponseMessage> CallApiAsync(string bookId, string endpoint, HttpMethod method, string sessionId, string requestBody = null)
        {
            string apiBaseUrl = _configuration["ReckonAPI:BaseUrl"];
            string apiSegment = _configuration["ReckonAPI:ApiSegment"];
            string subscriptionKey = _configuration["ReckonAPI:SubscriptionKey"];

            string accessToken = await _tokenService.GetValidAccessTokenAsync(sessionId);

            string requestUrl = $"{apiBaseUrl}{apiSegment}{bookId}/{endpoint}";
            HttpRequestMessage request = new HttpRequestMessage(method, requestUrl);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            if (!string.IsNullOrEmpty(requestBody) && (method == HttpMethod.Post || method == HttpMethod.Put))
            {
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
            }

            return await _httpClient.SendAsync(request);
        }

        public async Task<HttpResponseMessage> GetBooksAsync(string sessionId)
        {
            string apiBaseUrl = _configuration["ReckonAPI:BaseUrl"];
            string apiSegment = _configuration["ReckonAPI:ApiSegment"];
            string subscriptionKey = _configuration["ReckonAPI:SubscriptionKey"];

            string accessToken = await _tokenService.GetValidAccessTokenAsync(sessionId);

            string requestUrl = $"{apiBaseUrl}{apiSegment}books";
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            return await _httpClient.SendAsync(request);
        }
    }
}