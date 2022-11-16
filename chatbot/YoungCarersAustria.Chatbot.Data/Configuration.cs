using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data
{
    public record Configuration(
        [property: JsonPropertyName("characters")] IReadOnlyList<Character> Characters,
        [property: JsonPropertyName("messages")] Messages Messages
    );

    public record Character(
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("emoji")] string Emoji
    );

    public record Messages(
        [property: JsonPropertyName("welcome")] IReadOnlyList<List<string>> Welcome,
        [property: JsonPropertyName("notfound")] IReadOnlyList<List<string>> NotFound,
        [property: JsonPropertyName("found")] IReadOnlyList<List<string>> Found
    );
}
