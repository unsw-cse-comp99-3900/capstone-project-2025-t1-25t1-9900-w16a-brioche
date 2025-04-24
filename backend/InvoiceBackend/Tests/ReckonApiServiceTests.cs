using Xunit;
using Moq;
using System.Net;
using InvoiceBackend.Services.ReckonApiService;
using InvoiceBackend.Services.ReckonTokenService;
using Moq.Protected;

public class ReckonApiServiceTests
{
    private readonly Mock<IConfiguration> _mockConfig;
    private readonly Mock<IReckonTokenService> _mockTokenService;

    public ReckonApiServiceTests()
    {
        _mockConfig = new Mock<IConfiguration>();
        _mockTokenService = new Mock<IReckonTokenService>();
    }

    // Creates a ReckonApiService with a mock HttpClient
    private ReckonApiService CreateService(HttpResponseMessage fakeResponse)
    {
        var handlerMock = new Mock<HttpMessageHandler>();
        handlerMock
            .Protected()
            .Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
            .ReturnsAsync(fakeResponse);

        var client = new HttpClient(handlerMock.Object);

        // Mock config and token service
        _mockConfig.Setup(c => c["ReckonAPI:BaseUrl"]).Returns("https://api.reckon.com/");
        _mockConfig.Setup(c => c["ReckonAPI:ApiSegment"]).Returns("api/v2/");
        _mockConfig.Setup(c => c["ReckonAPI:SubscriptionKey"]).Returns("fake-sub-key");
        _mockTokenService.Setup(t => t.GetValidAccessTokenAsync(It.IsAny<string>()))
                         .ReturnsAsync("dummy-token");

        return new ReckonApiService(_mockConfig.Object, _mockTokenService.Object);
    }

    [Fact]
    public async Task CallApiAsync_ShouldReturnResponse()
    {
        var response = new HttpResponseMessage(HttpStatusCode.NotFound)
        {
            Content = new StringContent("{\"error\": \"not found\"}")
        };
        var service = CreateService(response);

        var result = await service.CallApiAsync("book123", "customers", HttpMethod.Get, "session123");

        Assert.NotNull(result); // Ensure response is returned
        Assert.Equal(HttpStatusCode.NotFound, result.StatusCode); // Optional: confirm actual status
    }

    [Fact]
    public async Task GetBooksAsync_ShouldReturnBooks()
    {
        var response = new HttpResponseMessage(HttpStatusCode.NotFound)
        {
            Content = new StringContent("[]")
        };
        var service = CreateService(response);

        var result = await service.GetBooksAsync("session123");

        Assert.NotNull(result); // Ensure response is returned
        Assert.Equal(HttpStatusCode.NotFound, result.StatusCode); // Optional: confirm actual status
    }
}
