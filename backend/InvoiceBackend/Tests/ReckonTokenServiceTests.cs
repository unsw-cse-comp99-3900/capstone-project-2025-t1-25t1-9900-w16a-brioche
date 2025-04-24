using Xunit;
using Moq;
using InvoiceBackend.Services.ReckonTokenService;
using InvoiceBackend.DataAccess.ReckonTokenRepository;
using InvoiceBackend.Domain.Entities;

public class ReckonTokenServiceTests
{
    [Fact]
    public async Task GetValidAccessTokenAsync_ShouldReturnAccessToken_IfTokenNotExpired()
    {
        // Arrange
        var mockRepo = new Mock<IReckonTokenRepository>();
        var mockConfig = new Mock<IConfiguration>();

        var fakeToken = new ReckonToken
        {
            SessionId = "session123",
            AccessToken = "fake-access-token",
            RefreshToken = "fake-refresh-token",
            TokenType = "Bearer",
            ExpiryTime = DateTime.UtcNow.AddMinutes(10),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        mockRepo.Setup(r => r.GetBySessionIdAsync("session123"))
                .ReturnsAsync(fakeToken);

        var service = new ReckonTokenService(mockRepo.Object, mockConfig.Object);

        // Act
        var result = await service.GetValidAccessTokenAsync("session123");

        // Assert
        Assert.Equal("fake-access-token", result);
    }
}
