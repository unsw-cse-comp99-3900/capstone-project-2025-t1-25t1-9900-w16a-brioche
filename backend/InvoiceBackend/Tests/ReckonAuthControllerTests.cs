using Xunit;
using Moq;
using InvoiceBackend.Controllers;
using InvoiceBackend.Services.ReckonTokenService;
using Microsoft.AspNetCore.Mvc;

public class ReckonAuthControllerTests
{
    [Fact]
    public void Login_ShouldReturnRedirectUrl()
    {
        // Arrange
        var mockService = new Mock<IReckonTokenService>();
        mockService.Setup(s => s.GetAuthUrl("abc-session")).Returns("https://login.test.com/oauth");

        var controller = new ReckonAuthController(mockService.Object);

        // Act
        var result = controller.Login("abc-session");

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        dynamic response = okResult.Value;
        
        Assert.Equal("https://login.test.com/oauth", response.redirectUrl.ToString());
    }
}
