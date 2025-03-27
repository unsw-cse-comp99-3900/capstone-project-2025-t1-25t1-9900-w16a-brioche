namespace InvoiceBackend.Services.ClerkAuthService
{
    public interface IClerkAuthService
    {
        Task<bool> VerifyTokenAsync(HttpRequest request);

        //GetUserIdAsync
    }
}
