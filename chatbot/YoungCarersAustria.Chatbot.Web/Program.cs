using YoungCarersAustria.Chatbot.Web.Extensions;
using YoungCarersAustria.Chatbot.Data;
using YoungCarersAustria.Chatbot.Search;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

Configuration configuration = null!;
Searcher searcher = new();

async Task RefreshContent()
{
    var data = await DataGetter.Load();

    configuration = data.configuration;
    searcher.Index(data.content);

    app.Logger.LogInformation("Content Refreshed {0}", new
    {
        characters = configuration.Characters.Count,
        welcome = configuration.Messages.Welcome.Count,
        found = configuration.Messages.Found.Count,
        notfound = configuration.Messages.NotFound.Count,
        references = data.content.References.Count
    });
}

await RefreshContent();

app.MapPost("/index/rebuild", async () => await RefreshContent());

app.MapGet("/character", () => configuration.Characters.RandomElement());

app.MapGet("/welcome", () => configuration.Messages.Welcome.RandomElement());

app.MapGet("/answer", (string message) =>
{
    var searchResult = searcher.Find(message);

    return searchResult != null
        ? new Answer.Found(
            Messages: configuration.Messages.Found.RandomElement(),
            Results: searchResult.ToList()) as Answer
        : new Answer.NotFound(
            Messages: configuration.Messages.NotFound.RandomElement()) as Answer;
});

app.Run();
