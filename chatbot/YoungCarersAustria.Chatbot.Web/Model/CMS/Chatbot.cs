using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Web.Model.CMS
{
    public record Messages(
        [property: JsonPropertyName("welcome")] IReadOnlyList<List<string>> Welcome,
        [property: JsonPropertyName("notfound")] IReadOnlyList<List<string>> Notfound,
        [property: JsonPropertyName("found")] IReadOnlyList<List<string>> Found
    );

    public record Chatbot(
        [property: JsonPropertyName("characters")] IReadOnlyList<Character> Characters,
        [property: JsonPropertyName("messages")] Messages Messages
    );

    public record Character(
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("emoji")] string Emoji
    );

}
