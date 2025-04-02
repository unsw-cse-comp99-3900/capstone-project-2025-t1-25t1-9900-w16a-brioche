 namespace InvoiceBackend.Domain.Entities
{
    public class ReckonToken
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string TokenType { get; set; }
        public DateTime ExpiryTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
