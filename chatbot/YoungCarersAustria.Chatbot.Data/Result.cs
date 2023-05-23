using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data
{
    public abstract record Result(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("id")] string Id)
    {
        public record Insight(YoungCarersAustria.Chatbot.Data.Insight insight) : Result("insight", insight.Question);
        public record Category(YoungCarersAustria.Chatbot.Data.Category category) : Result("category", category.Id);
        public record Reference(YoungCarersAustria.Chatbot.Data.Reference reference) : Result("reference", reference.Id);
    }
}