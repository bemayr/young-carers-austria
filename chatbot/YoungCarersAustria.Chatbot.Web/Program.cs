using Lucene.Net.Analysis;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers.Classic;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;
using System.Text.Json.Serialization;
using YoungCarersAustria.Chatbot.Web.Model.CMS;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var random = new Random();
var app = builder.Build();

// Configure the HTTP request pipeline.

Chatbot chatbotData = new(
    Characters: new[] { new Character("🤖", "Robert") },
    Messages: new(
        Welcome: new[] { new[] { "Willkommen" }.ToList() },
        Found: new[] { new[] { "Gefunden" }.ToList() },
        Notfound: new[] { new[] { "Nicht gefunden" }.ToList() }));
Content content;

using (HttpClient httpClient = new())
{
    chatbotData = await httpClient.GetFromJsonAsync<Chatbot>("https://redaktion.young-carers-austria.at/api/v1/chatbot") ?? throw new Exception("Chatbot Data could not be loaded from CMS");
    content = await httpClient.GetFromJsonAsync<Content>("https://redaktion.young-carers-austria.at/api/v1/content") ?? throw new Exception("Content could not be loaded from CMS");
}

var referenceLookup = content.References.ToDictionary(reference => reference.Id);




// Specify the compatibility version we want
const LuceneVersion luceneVersion = LuceneVersion.LUCENE_48;

//Open the Directory using a Lucene Directory class
using RAMDirectory indexDir = new();

// Create an analyzer to process the text 
Analyzer standardAnalyzer = new StandardAnalyzer(luceneVersion);

//Create an index writer
IndexWriterConfig indexConfig = new IndexWriterConfig(luceneVersion, standardAnalyzer);
indexConfig.OpenMode = OpenMode.CREATE;                             // create/overwrite index
IndexWriter writer = new IndexWriter(indexDir, indexConfig);

var documents = content.References.Select(reference =>
    new Document()
    {
        new StoredField(name: "id", reference.Id),
        new StringField(name: "url", reference.Url, Field.Store.YES),
        new TextField(name: "title", reference.Title, Field.Store.YES),
        new TextField(name: "description", reference.Description, Field.Store.NO),
        new StringField(name: "keywords", string.Join(", ", reference.Keywords), Field.Store.NO)
    });

writer.AddDocuments(documents);
writer.Commit();

using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
IndexSearcher searcher = new IndexSearcher(reader);

QueryParser parser = new QueryParser(luceneVersion, "title", standardAnalyzer);




app.MapGet("/character", () =>
{
    var character = chatbotData.Characters.ElementAt(random.Next(chatbotData.Characters.Count));
    return new
    {
        name = character.Name,
        emoji = character.Emoji,
    };
});

app.MapGet("/welcome", () =>
{
    return chatbotData.Messages.Welcome.ElementAt(random.Next(chatbotData.Messages.Welcome.Count));
});

app.MapGet("/answer", (string message) =>
{
    Query query = parser.Parse(message);
    TopDocs searchResult = searcher.Search(query, n: 5);

    var results = searchResult.ScoreDocs.Select(hit =>
        new Result.Reference(referenceLookup[searcher.Doc(hit.Doc).Get("id")]));

    return searchResult.ScoreDocs.Any()
        ? new Answer.Found(
            Messages: chatbotData.Messages.Found.ElementAt(random.Next(chatbotData.Messages.Found.Count)),
            Results: results.ToList()) as Answer
        : new Answer.NotFound(
            Messages: chatbotData.Messages.Notfound.ElementAt(random.Next(chatbotData.Messages.Found.Count))) as Answer;
});

app.Run();

abstract record Answer(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("messages")] IReadOnlyList<string> Messages)
{
    public record NotFound(IReadOnlyList<string> Messages) : Answer("no-result-found", Messages);
    public record Found(
        IReadOnlyList<string> Messages,
        [property: JsonPropertyName("results")] IReadOnlyList<object> Results) : Answer("result-found", Messages);
}

abstract record Result(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("id")] string Id)
{
    public record Reference(YoungCarersAustria.Chatbot.Web.Model.CMS.Reference reference) : Result("reference", reference.Id);
}