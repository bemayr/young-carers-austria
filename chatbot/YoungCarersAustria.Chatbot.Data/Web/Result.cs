using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data.Web;

public abstract record Result(
[property: JsonPropertyName("type")] string Type,
[property: JsonPropertyName("id")] string Id) : IMessage
{
    public record Category(Web.Category category) : Result("category", category.Id);
    public record Reference(Web.Reference reference) : Result("reference", reference.Id);
    public record Situation(Web.Situation situation) : Result("insight", situation.Id);
    public record FAQ(Web.FAQ.Entry faq) : Result("faq", faq.Id);
}