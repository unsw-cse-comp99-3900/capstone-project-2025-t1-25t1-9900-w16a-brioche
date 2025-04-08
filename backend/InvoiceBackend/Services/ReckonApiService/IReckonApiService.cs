namespace InvoiceBackend.Services.ReckonApiService
{
    public interface IReckonApiService
    {
        Task<HttpResponseMessage> CallApiAsync(string bookId, string endpoint, HttpMethod method, string sessionId, string requestBody = null);
        Task<HttpResponseMessage> GetBooksAsync(string sessionId);
    }
}
