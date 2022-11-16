using System.Text.Json.Serialization;

public abstract record Result(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("id")] string Id)
{
    public record Reference(YoungCarersAustria.Chatbot.Data.Reference reference) : Result("reference", reference.Id);
}