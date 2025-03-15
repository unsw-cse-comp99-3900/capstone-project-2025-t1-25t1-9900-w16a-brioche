using System.Net.Http.Headers;
using System.Text;


namespace InvoiceBackend.Services.ReckonApiService
{
    public class ReckonApiService : IReckonApiService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public ReckonApiService(IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        public async Task<HttpResponseMessage> CallApiAsync(string bookId, string endpoint, HttpMethod method, string requestBody = null)
        {
            string apiBaseUrl = _configuration["ReckonAPI:BaseUrl"];
            string apiSegment = _configuration["ReckonAPI:ApiSegment"];
            string accessToken = _configuration["ReckonAPI:AccessToken"];//应该从前端拿
            string subscriptionKey = _configuration["ReckonAPI:SubscriptionKey"];

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

        public async Task<HttpResponseMessage> GetBooksAsync()
        {
            string apiBaseUrl = _configuration["ReckonAPI:BaseUrl"];
            string apiSegment = _configuration["ReckonAPI:ApiSegment"];
            string accessToken = _configuration["ReckonAPI:AccessToken"];//应该从前端拿
            string subscriptionKey = _configuration["ReckonAPI:SubscriptionKey"];

            string requestUrl = $"{apiBaseUrl}{apiSegment}books"; // books endpoint

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            return await _httpClient.SendAsync(request);
        }
    }
}
