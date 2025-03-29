using InvoiceBackend.Domain.Entities;

namespace InvoiceBackend.Services.ReckonTokenService
{
    public interface IReckonTokenService
    {
        string GetAuthUrl(string sessionId);
        Task<ReckonToken> ExchangeCodeAsync(string code, string sessionId);
        Task<ReckonToken> RefreshTokenAsync(string sessionId);
        Task<string> GetValidAccessTokenAsync(string sessionId);
    }
}
