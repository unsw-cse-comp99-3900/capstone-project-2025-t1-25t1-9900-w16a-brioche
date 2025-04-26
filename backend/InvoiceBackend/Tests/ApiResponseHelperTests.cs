using Xunit;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using InvoiceBackend.Helpers;
using Microsoft.AspNetCore.Mvc;

public class ApiResponseHelperTests
{
    [Fact]
    public async Task HandleApiResponse_ShouldReturnContentResultWithCorrectData()
    {
        // Arrange
        var fakeJson = "{\"message\":\"hello world\"}";
        var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
        {
            Content = new StringContent(fakeJson)
        };

        // Act
        var result = await ApiResponseHelper.HandleApiResponse(response);

        // Assert
        var contentResult = Assert.IsType<ContentResult>(result);
        Assert.Equal(400, contentResult.StatusCode);
        Assert.Equal(fakeJson, contentResult.Content);
        Assert.Equal("application/json; charset=utf-8", contentResult.ContentType);
    }
}
