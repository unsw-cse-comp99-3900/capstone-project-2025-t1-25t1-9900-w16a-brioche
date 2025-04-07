using InvoiceBackend.DataAccess.ReckonTokenRepository;
using InvoiceBackend.Domain.Entities;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text;

namespace InvoiceBackend.Services.ReckonTokenService
{
    public class ReckonTokenService : IReckonTokenService
    {
        private readonly IReckonTokenRepository _repo;
        private readonly IConfiguration _config;
        private readonly HttpClient _http;

        public ReckonTokenService(IReckonTokenRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
            _http = new HttpClient();
        }

        public string GetAuthUrl(string sessionId)
        {
            var clientId = _config["ReckonAPI:ClientId"];
            var redirectUri = _config["ReckonAPI:RedirectUri"];

            var url = "https://identity.reckon.com/connect/authorize" +
                      $"?client_id={clientId}" +
                      $"&response_type=code" +
                      $"&scope=openid%20read%20write%20offline_access" +
                      $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
                      $"&state={sessionId}";

            return url;
        }

        public async Task<ReckonToken> ExchangeCodeAsync(string code, string sessionId)
        {
            var existingToken = await _repo.GetBySessionIdAsync(sessionId);
            if (existingToken != null)
            {
                return existingToken;
            }

            var token = await RequestTokenAsync("authorization_code", "code", code);
            token.SessionId = sessionId;
            token.CreatedAt = DateTime.UtcNow;
            token.UpdatedAt = DateTime.UtcNow;

            await _repo.SaveTokenAsync(token);

            return token;
        }

        public async Task<ReckonToken> RefreshTokenAsync(string sessionId)
        {
            var existing = await _repo.GetBySessionIdAsync(sessionId);
            if (existing == null) throw new Exception("Token not found");

            var token = await RequestTokenAsync("refresh_token", "refresh_token", existing.RefreshToken);
            token.SessionId = sessionId;
            token.CreatedAt = existing.CreatedAt;
            token.UpdatedAt = DateTime.UtcNow;

            await _repo.UpdateTokenAsync(token);
            return token;
        }

        public async Task<string> GetValidAccessTokenAsync(string sessionId)
        {
            var token = await _repo.GetBySessionIdAsync(sessionId);
            if (token == null) throw new Exception("Token not found");

            if (DateTime.UtcNow >= token.ExpiryTime.AddMinutes(-5))
            {
                token = await RefreshTokenAsync(sessionId);
            }

            return token.AccessToken;
        }

        private async Task<ReckonToken> RequestTokenAsync(string grantType, string key, string value)
        {
            var clientId = _config["ReckonAPI:ClientId"];
            var clientSecret = _config["ReckonAPI:ClientSecret"];
            var redirectUri = _config["ReckonAPI:RedirectUri"];

            var content = new StringContent(
                $"grant_type={grantType}&{key}={value}&redirect_uri={redirectUri}",
                Encoding.UTF8, "application/x-www-form-urlencoded"
            );

            var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);

            var response = await _http.PostAsync("https://identity.reckon.com/connect/token", content);
            var body = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(body);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Token refresh failed: {body}");
            }

            var accessToken = json.Value<string>("access_token");
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new Exception("access_token is null or missing from token response");
            }

            return new ReckonToken
            {
                AccessToken = json.Value<string>("access_token"),
                RefreshToken = json.Value<string>("refresh_token"),
                TokenType = json.Value<string>("token_type"),
                ExpiryTime = DateTime.UtcNow.AddSeconds(json.Value<int>("expires_in"))
            };
        }
    }
}
