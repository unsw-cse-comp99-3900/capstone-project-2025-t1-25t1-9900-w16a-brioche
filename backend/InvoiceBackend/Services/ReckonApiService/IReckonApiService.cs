namespace InvoiceBackend.Services.ReckonApiService
{
    public interface IReckonApiService
    {
        Task<HttpResponseMessage> CallApiAsync(string bookId, string endpoint, HttpMethod method, string requestBody = null);
        Task<HttpResponseMessage> GetBooksAsync(string sessionId);
    }
}
