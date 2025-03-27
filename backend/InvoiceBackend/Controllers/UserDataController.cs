using InvoiceBackend.Services.ClerkAuthService;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserDataController : ControllerBase
{
    private readonly IClerkAuthService _authService;

    public UserDataController(IClerkAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet]
    public async Task<IActionResult> GetData()
    {
        if (!await _authService.VerifyTokenAsync(Request))
        {
            return Unauthorized();
        }

        //string userId = await _authService.GetUserIdAsync(Request);

        return Ok(new
        {
            Message = "ok",
            //UserId = userId
        });
    }
}