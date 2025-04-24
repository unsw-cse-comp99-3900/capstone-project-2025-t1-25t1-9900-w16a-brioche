using Xunit;
using Microsoft.EntityFrameworkCore;
using InvoiceBackend.DataAccess.ReckonTokenRepository;
using InvoiceBackend.Domain.Entities;
using InvoiceBackend.DataAccess;

public class ReckonTokenRepositoryTests
{
    private AppDbContext GetInMemoryDb()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task SaveAndGetToken_ShouldWorkCorrectly()
    {
        var db = GetInMemoryDb();
        var repo = new ReckonTokenRepository(db);

        var token = new ReckonToken
        {
            SessionId = "test-session",
            AccessToken = "access",
            RefreshToken = "refresh",
            TokenType = "Bearer",
            ExpiryTime = DateTime.UtcNow.AddHours(1),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await repo.SaveTokenAsync(token);

        var result = await repo.GetBySessionIdAsync("test-session");

        Assert.NotNull(result);
        Assert.Equal("access", result.AccessToken);
    }
}
