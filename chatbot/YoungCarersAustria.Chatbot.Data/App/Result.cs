using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data.App;

public abstract record Result(
[property: JsonPropertyName("type")] string Type,
[property: JsonPropertyName("id")] string Id)
{
    public record Reference(App.Reference reference) : Result("reference", reference.Id);
}