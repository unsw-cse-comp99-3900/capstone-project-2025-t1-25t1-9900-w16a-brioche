using InvoiceBackend.Services.ReckonTokenService;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReckonAuthController : ControllerBase
    {
        private readonly IReckonTokenService _reckon;

        public ReckonAuthController(IReckonTokenService reckon)
        {
            _reckon = reckon;
        }

        [HttpGet("login")]
        public IActionResult Login([FromQuery] string sessionId)
        {
            var url = _reckon.GetAuthUrl(sessionId);
            return Ok(new { redirectUrl = url });
        }

        public class CallbackDto
        {
            public string Code { get; set; }
            public string State { get; set; } // This is sessionId
        }

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
