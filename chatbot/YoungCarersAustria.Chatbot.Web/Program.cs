using YoungCarersAustria.Chatbot.Web.Extensions;
using YoungCarersAustria.Chatbot.Data;
using YoungCarersAustria.Chatbot.Search;
using System;
using System.Web;
using UAParser;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:8080/");
        });
});

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:8080/");
        });
});


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
        insights = data.content.Insights.Count,
        categories = data.content.Categories.Count,
        references = data.content.References.Count
    });
}

await RefreshContent();

app.MapPost("/index/rebuild", async () => await RefreshContent());

app.MapGet("/character", () => configuration.Characters.RandomElement());

app.MapGet("/welcome", () => configuration.Messages.Welcome.RandomElement());

app.MapGet("/keywords", (string text) => searcher.GetTokens(text));

async Task Trace(string query)
{
    using HttpClient httpClient = new() { BaseAddress = new Uri("https://insights.young-carers-austria.at/") };
    Console.WriteLine("||| before");
    var result = await httpClient.PostAsync($"matomo.php?{query}", null);
    Console.WriteLine(result);
    Console.WriteLine("||| after");
}

app.MapGet("/answer-debug", (string message, HttpContext context) =>
{
    var searchResult = searcher.Find(message)?.ToList();

    var userAgent = context.Request.Headers["User-Agent"];
    var uaParser = Parser.GetDefault();
    ClientInfo clientInfo = uaParser.Parse(userAgent);
    var platform = clientInfo.UA.Family switch
    {
        "Young%20Carers%20Austria" => "ios-debug",  // User-Agent of the iOS-App is "Young%20Carers%20Austria 6" (ref: https://stackoverflow.com/questions/36379347/does-nsurlsession-send-user-agent-automatically)
        "okhttp" => "android-debug", // User-Agent of the Android-App is "okhttp"
        _ => "web-debug"
    };

    Console.WriteLine($"OPERATING SYSTEM: {new { os = clientInfo.OS, uafamily = clientInfo.UA.Family }}");

    var query = HttpUtility.ParseQueryString("idsite=2&rec=1");
    query["search"] = message;
    query["search_cat"] = $"chatbot-{platform}";
    query["search_count"] = searchResult?.Count.ToString() ?? "0";

    _ = Trace(query.ToString()!);

    Console.WriteLine($"TRACING: {query}");

    //var task = httpClient.GetAsync($"matomo.php?{query}");
    //task.Wait();

    //using HttpClient httpClient = new() { BaseAddress = new Uri("https://insights.young-carers-austria.at/") };
    //_ = httpClient.PostAsync($"matomo.php?{query}", null);



    return searchResult != null
        ? new Answer.Found(
            Messages: configuration.Messages.Found.RandomElement(),
            Results: searchResult) as Answer
        : new Answer.NotFound(
            Messages: configuration.Messages.NotFound.RandomElement()) as Answer;
});

app.MapGet("/answer", (string message, HttpContext context) =>
{
    var searchResult = searcher.Find(message)?.Where(result => result.Type == "reference").ToList();

    var userAgent = context.Request.Headers["User-Agent"];
    var uaParser = Parser.GetDefault();
    ClientInfo clientInfo = uaParser.Parse(userAgent);
    var platform = clientInfo.UA.Family switch
    {
        "Young%20Carers%20Austria" => "ios",  // User-Agent of the iOS-App is "Young%20Carers%20Austria 6" (ref: https://stackoverflow.com/questions/36379347/does-nsurlsession-send-user-agent-automatically)
        "okhttp" => "android", // User-Agent of the Android-App is "okhttp"
        _ => "web"
    };

    Console.WriteLine($"OPERATING SYSTEM: {new { os = clientInfo.OS, uafamily = clientInfo.UA.Family }}");

    var query = HttpUtility.ParseQueryString("idsite=2&rec=1");
    query["search"] = message;
    query["search_cat"] = $"chatbot-{platform}";
    query["search_count"] = searchResult?.Count.ToString() ?? "0";

    _ = Trace(query.ToString()!);

    Console.WriteLine($"TRACING: {query}");

    //var task = httpClient.GetAsync($"matomo.php?{query}");
    //task.Wait();


    return searchResult != null
        ? new Answer.Found(
            Messages: configuration.Messages.Found.RandomElement(),
            Results: searchResult) as Answer
        : new Answer.NotFound(
            Messages: configuration.Messages.NotFound.RandomElement()) as Answer;
});

app.UseCors();
app.UseCors(MyAllowSpecificOrigins);
app.UseCors(builder => builder.AllowAnyOrigin());
app.Run();
