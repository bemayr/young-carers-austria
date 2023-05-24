using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data.App;

public record Reference(
    [property: JsonPropertyName("id")] string Id,
    [property: JsonPropertyName("url")] string Url,
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("description")] string Description,
    [property: JsonPropertyName("previewImageUrl")] string PreviewImageUrl,
    [property: JsonPropertyName("containsPaidContent")] bool ContainsPaidContent,
    [property: JsonPropertyName("keywords")] IReadOnlyList<string> Keywords
)
{
    [property: JsonPropertyName("isPaidContent")]
    public bool IsPaidContent => ContainsPaidContent; // todo: remove this
}

public record Content(
    [property: JsonPropertyName("references")] IReadOnlyList<Reference> References
);
