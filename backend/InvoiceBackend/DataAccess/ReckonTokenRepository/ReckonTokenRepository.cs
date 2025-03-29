using InvoiceBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace InvoiceBackend.DataAccess.ReckonTokenRepository
{
    public class ReckonTokenRepository: IReckonTokenRepository
    {
        private readonly AppDbContext _context;

        public ReckonTokenRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ReckonToken> GetBySessionIdAsync(string sessionId)
        {
            return await _context.ReckonTokens.FirstOrDefaultAsync(t => t.SessionId == sessionId);
        }

        public async Task SaveTokenAsync(ReckonToken reckonToken)
        {
            await _context.ReckonTokens.AddAsync(reckonToken);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTokenAsync(ReckonToken reckonToken)
        {
            var existing = await _context.ReckonTokens
                .FirstOrDefaultAsync(t => t.SessionId == reckonToken.SessionId);

            if (existing != null)
            {
                existing.AccessToken = reckonToken.AccessToken;
                existing.RefreshToken = reckonToken.RefreshToken;
                existing.ExpiryTime = reckonToken.ExpiryTime;
                existing.TokenType = reckonToken.TokenType;
                existing.UpdatedAt = reckonToken.UpdatedAt;

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteTokenAsync(string sessionId)
        {
            var token = await GetBySessionIdAsync(sessionId);
            if (token != null)
            {
                _context.ReckonTokens.Remove(token);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(string sessionId)
        {
            return await _context.ReckonTokens.AnyAsync(t => t.SessionId == sessionId);
        }
    }
}
