using System.Text.Json;
using System.Text.Json.Serialization;

namespace YoungCarersAustria.Chatbot.Data.Web;

public record Collection<TItem>(
    [property: JsonPropertyName("docs")] IReadOnlyList<TItem> Docs,
    [property: JsonPropertyName("totalDocs")] int TotalDocs,
    [property: JsonPropertyName("hasNextPage")] bool HasNextPage
);

public record Category(
    [property: JsonPropertyName("id")] string Id,
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("heading")] string Heading,
    [property: JsonPropertyName("keywords")] string Keywords,
    [property: JsonPropertyName("descriptionPlain")] string DescriptionPlain
)
{
    [JsonExtensionData]
    public Dictionary<string, object>? ExtensionData { get; init; }
}

public record Reference(
    [property: JsonPropertyName("id")] string Id,
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("description")] string Description,
    [property: JsonPropertyName("keywords")] string Keywords
)
{
    [JsonExtensionData]
    public Dictionary<string, object>? ExtensionData { get; init; }
}

public record Situation(
    [property: JsonPropertyName("id")] string Id,
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("contentPlain")] string ContentPlain
)
{
    [JsonExtensionData]
    public Dictionary<string, object>? ExtensionData { get; init; }
}

public record FAQ(
    [property: JsonPropertyName("entries")] IReadOnlyList<FAQ.Entry> Entries
)
{
    public record Entry(
        [property: JsonPropertyName("id")] string Id,
        [property: JsonPropertyName("question")] string Question,
        [property: JsonPropertyName("answerPlain")] string AnswerPlain
    )
    {
        [JsonExtensionData]
        public Dictionary<string, object>? ExtensionData { get; init; }
    }
};


public record Content(
    IReadOnlyList<Category> Categories,
    IReadOnlyList<Reference> References,
    IReadOnlyList<Situation> Situations,
    IReadOnlyList<FAQ.Entry> Faqs
);
