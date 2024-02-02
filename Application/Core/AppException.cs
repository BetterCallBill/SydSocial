namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string messages, string details = null)
        {
            StatusCode = statusCode;
            Messages = messages;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Messages { get; set; }
        public string Details { get; set; }
    }
}