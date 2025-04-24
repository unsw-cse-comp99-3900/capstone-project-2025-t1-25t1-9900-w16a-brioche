using Xunit;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InvoiceBackend.Controllers;
using InvoiceBackend.Services.ClerkAuthService;

public class UserDataControllerTests
{
    [Fact]
    public async Task GetData_ShouldReturnOk_WhenTokenIsValid()
    {
        // Arrange
        var mockAuth = new Mock<IClerkAuthService>();
        mockAuth.Setup(a => a.VerifyTokenAsync(It.IsAny<HttpRequest>()))
                .ReturnsAsync(true);

        var controller = new UserDataController(mockAuth.Object);
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext()
        };

        // Act
        var result = await controller.GetData();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        dynamic value = okResult.Value;
        Assert.Equal("ok", value.Message.ToString());
    }

    [Fact]
    public async Task GetData_ShouldReturnUnauthorized_WhenTokenIsInvalid()
    {
        // Arrange
        var mockAuth = new Mock<IClerkAuthService>();
        mockAuth.Setup(a => a.VerifyTokenAsync(It.IsAny<HttpRequest>()))
                .ReturnsAsync(false);

        var controller = new UserDataController(mockAuth.Object);
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext()
        };

        // Act
        var result = await controller.GetData();

        // Assert
        Assert.IsType<UnauthorizedResult>(result);
    }
}
