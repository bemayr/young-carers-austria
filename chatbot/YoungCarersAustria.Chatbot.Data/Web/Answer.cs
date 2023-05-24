using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data.Web;

public interface IMessage
{
    string Type { get; }
}
public record Message([property: JsonPropertyName("text")] string Text) : IMessage
{
    public string Type => "text";
}

public abstract record Answer(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("messages")] IReadOnlyList<object> Messages)
{
    public record NotFound(IReadOnlyList<object> Messages) : Answer("no-result-found", Messages);
    public record Found(IReadOnlyList<object> Messages) : Answer("result-found", Messages);
}