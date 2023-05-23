using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data
{
    public record Insight(
        [property: JsonPropertyName("question")] string Question,
        [property: JsonPropertyName("content")] IReadOnlyList<InsightContentPart> Parts
    );
    public record InsightContentPart(
        [property: JsonPropertyName("type")] string Type,
        [property: JsonPropertyName("text")] string? Text,
        [property: JsonPropertyName("category")] string? Category,
        [property: JsonPropertyName("reference")] string? Reference
    );

    public record Category(
        [property: JsonPropertyName("id")] string Id,
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("title")] string Title,
        [property: JsonPropertyName("information")] string Information
    );

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
        [property: JsonPropertyName("insights")] IReadOnlyList<Insight> Insights,
        [property: JsonPropertyName("categories")] IReadOnlyList<Category> Categories,
        [property: JsonPropertyName("references")] IReadOnlyList<Reference> References
    );
}
