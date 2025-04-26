using Xunit;
using Moq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using InvoiceBackend.Controllers;
using InvoiceBackend.Services.ReckonApiService;
using Microsoft.AspNetCore.Http.Features;
using System.Text;

public class InvoicesControllerTests
{
    [Fact]
    public async Task GetInvoices_ShouldReturnContentResult_WhenSessionIdProvided()
    {
        // Arrange
        var mockService = new Mock<IReckonApiService>();
        var expectedResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent("{\"result\": \"ok\"}", Encoding.UTF8, "application/json")
        };

        mockService.Setup(s =>
            s.CallApiAsync("book123", "invoices", HttpMethod.Get, "session-abc", null)
        ).ReturnsAsync(expectedResponse);

        var controller = new InvoicesController(mockService.Object);

        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext()
        };
        controller.ControllerContext.HttpContext.Request.Headers["X-Session-ID"] = "session-abc";

        // Act
        var result = await controller.GetInvoices("book123", null, null);

        // Assert
        var contentResult = Assert.IsType<ContentResult>(result);
        Assert.Equal(200, contentResult.StatusCode);
        Assert.Equal("{\"result\": \"ok\"}", contentResult.Content);
    }
}
