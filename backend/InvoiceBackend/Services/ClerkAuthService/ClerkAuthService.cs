using Clerk.BackendAPI.Helpers.Jwks;

namespace InvoiceBackend.Services.ClerkAuthService
{
    public class ClerkAuthService: IClerkAuthService
    {
        private readonly string _secretKey;

        public ClerkAuthService(IConfiguration configuration)
        {
            _secretKey = configuration["Clerk:SecretKey"];
        }

        public async Task<bool> VerifyTokenAsync(HttpRequest request)
        {

                var options = new AuthenticateRequestOptions(
                    secretKey: _secretKey,
                    authorizedParties: new string[] { "http://localhost:5173" }
                );

                var requestState = await AuthenticateRequest.AuthenticateRequestAsync(request, options);

                return requestState.IsSignedIn();
        }
    }
}
