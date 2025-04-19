using InvoiceBackend.Services.ReckonTokenService;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    /// <summary>
    /// Controller for handling Reckon One OAuth2 authentication, including login redirection,
    /// token exchange, and token refresh functionality.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ReckonAuthController : ControllerBase
    {
        private readonly IReckonTokenService _reckon;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReckonAuthController"/> class.
        /// </summary>
        /// <param name="reckon">Service to handle Reckon token operations.</param>
        public ReckonAuthController(IReckonTokenService reckon)
        {
            _reckon = reckon;
        }

        /// <summary>
        /// Generates the Reckon One OAuth2 login URL for redirection.
        /// </summary>
        /// <param name="sessionId">A unique session identifier used as the state parameter.</param>
        /// <returns>A URL for the frontend to redirect the user to Reckon One login.</returns>
        [HttpGet("login")]
        public IActionResult Login([FromQuery] string sessionId)
        {
            var url = _reckon.GetAuthUrl(sessionId);
            return Ok(new { redirectUrl = url });
        }

        /// <summary>
        /// DTO representing the callback data returned by Reckon after successful login.
        /// </summary>
        public class CallbackDto
        {
            /// <summary>
            /// The authorization code returned by Reckon.
            /// </summary>
            public string Code { get; set; }

            /// <summary>
            /// The session ID (used as the OAuth2 state).
            /// </summary>
            public string State { get; set; }
        }

        /// <summary>
        /// Handles the Reckon One OAuth2 callback and exchanges the authorization code for an access token.
        /// </summary>
        /// <param name="dto">The callback data, including code and state (session ID).</param>
        /// <returns>The access token and expiration time.</returns>
        [HttpPost("callback")]
        public async Task<IActionResult> Callback([FromBody] CallbackDto dto)
        {
            var token = await _reckon.ExchangeCodeAsync(dto.Code, dto.State);
            return Ok(new
            {
                message = "Token get successfully!",
                accessToken = token.AccessToken,
                expiresAt = token.ExpiryTime
            });
        }

        /// <summary>
        /// Refreshes the access token using the refresh token stored for the given session.
        /// </summary>
        /// <param name="sessionId">The session ID associated with the user's tokens.</param>
        /// <returns>The new access token and updated expiration time.</returns>
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromQuery] string sessionId)
        {
            try
            {
                var token = await _reckon.RefreshTokenAsync(sessionId);
                return Ok(new
                {
                    message = "Token refreshed successfully!",
                    accessToken = token.AccessToken,
                    expiresAt = token.ExpiryTime
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Token refresh failed.",
                    error = ex.Message
                });
            }
        }
    }
}
