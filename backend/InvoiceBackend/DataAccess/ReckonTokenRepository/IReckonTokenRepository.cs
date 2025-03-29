using InvoiceBackend.Domain.Entities;

namespace InvoiceBackend.DataAccess.ReckonTokenRepository
{
    public interface IReckonTokenRepository
    {
        Task<ReckonToken> GetBySessionIdAsync(string sessionId);

        Task SaveTokenAsync(ReckonToken reckonToken);

        Task UpdateTokenAsync(ReckonToken reckonToken);

        Task DeleteTokenAsync(string sessionId);

        Task<bool> ExistsAsync(string sessionId);
    }
}
