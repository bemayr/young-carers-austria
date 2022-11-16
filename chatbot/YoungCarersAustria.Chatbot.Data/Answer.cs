using System.Text.Json.Serialization;

public abstract record Answer(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("messages")] IReadOnlyList<string> Messages)
{
    public record NotFound(IReadOnlyList<string> Messages) : Answer("no-result-found", Messages);
    public record Found(
        IReadOnlyList<string> Messages,
        [property: JsonPropertyName("results")] IReadOnlyList<object> Results) : Answer("result-found", Messages);
}
