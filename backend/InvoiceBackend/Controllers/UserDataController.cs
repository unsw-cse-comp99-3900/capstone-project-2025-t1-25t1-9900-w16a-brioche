using InvoiceBackend.Services.ClerkAuthService;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for retrieving authenticated user data after token verification via Clerk.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UserDataController : ControllerBase
    {
        private readonly IClerkAuthService _authService;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserDataController"/> class.
        /// </summary>
        /// <param name="authService">Service for verifying Clerk authentication tokens.</param>
        public UserDataController(IClerkAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Retrieves basic confirmation that the current request is authenticated.
        /// </summary>
        /// <returns>
        /// 200 OK if token is valid; 401 Unauthorized if verification fails.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetData()
        {
            if (!await _authService.VerifyTokenAsync(Request))
            {
                return Unauthorized();
            }
            
            return Ok(new
            {
                Message = "ok",
            });
        }
    }
}
