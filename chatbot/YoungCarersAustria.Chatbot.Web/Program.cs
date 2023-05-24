using YoungCarersAustria.Chatbot.Web.Extensions;
using YoungCarersAustria.Chatbot.Data;
using YoungCarersAustria.Chatbot.Search;
using System.Web;
using UAParser;
using YoungCarersAustria.Chatbot.Data.App;
using YoungCarersAustria.Chatbot.Data.Web;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

Configuration configuration = null!;
Searcher searcher = new();
AppSearcher appSearcher = new();
WebSearcher webSearcher = new();

async Task RefreshContent()
{
    var data = await DataGetter.Load() ?? throw new Exception("Data Loading failed...");

    configuration = data.Configuration;
    appSearcher.Index(data.AppContent);
    webSearcher.Index(data.WebContent);

    app.Logger.LogInformation("Content Refreshed: {data}", data);
}

await RefreshContent();

app.MapPost("/index/rebuild", async () => await RefreshContent());

app.MapGet("/character", () => configuration.Characters.RandomElement());

app.MapGet("/welcome", GetWelcomeMessage);

app.MapGet("/keywords", searcher.GetTokens);

app.MapGet("/answer", GetAnswer);

object GetWelcomeMessage(HttpContext context) => GetPlatform(context) switch
{
    Platform.iOS => configuration.Messages.Welcome.RandomElement(),
    Platform.Android => configuration.Messages.Welcome.RandomElement(),
    Platform.Web => configuration.Messages.Welcome.RandomElement().Select(text => new Message(text)),
    _ => throw new NotImplementedException(),
};

async Task<object> GetAnswer(string message, HttpContext context) {
    async Task Trace(Platform platform, string message, int resultCount)
    {
        var platformString = platform switch
        {
            Platform.iOS => "ios",
            Platform.Android => "android",
            Platform.Web => "web",
            _ => throw new NotImplementedException($"Platform {platform} is not supported...")
        };

        var query = HttpUtility.ParseQueryString("rec=1");
        query["idsite"] = Environment.GetEnvironmentVariable("INSIGHTS_PAGE_ID") ?? throw new Exception("INSIGHTS_PAGE_ID not defined");
        query["search"] = message;
        query["search_cat"] = $"chatbot-{platformString}";
        query["search_count"] = resultCount.ToString();

        using HttpClient httpClient = new() { BaseAddress = new Uri(Environment.GetEnvironmentVariable("INSIGHTS_URL") ?? throw new Exception("INSIGHTS_URL not defined")) };
        var result = await httpClient.PostAsync($"matomo.php?{query}", null);
    }

    var platform = GetPlatform(context);
    switch (platform)
    {
        case Platform.iOS:
        case Platform.Android:
            var appResults = await appSearcher.Find(message).ToListAsync();
            _ = Trace(platform, message, appResults.Count);

            return appResults.Any()
                ? new YoungCarersAustria.Chatbot.Data.App.Answer.Found(
                    Messages: configuration.Messages.Found.RandomElement(),
                    Results: appResults) as YoungCarersAustria.Chatbot.Data.App.Answer
                : new YoungCarersAustria.Chatbot.Data.App.Answer.NotFound(
                    Messages: configuration.Messages.NotFound.RandomElement());

        case Platform.Web:
            var webResults = await webSearcher.Find(message).ToListAsync();
            _ = Trace(platform, message, webResults.Count);

            IEnumerable<IMessage> ResultsFound()
            {
                foreach (var foundMessage in configuration.Messages.Found.RandomElement())
                    yield return new Message(foundMessage);

                foreach (var result in webResults)
                    yield return result;

                foreach (var feedbackMessage in configuration.Messages.Feedback.RandomElement())
                    yield return new Message(feedbackMessage);
            }
            IEnumerable<IMessage> NoResultsFound()
            {
                foreach (var notfoundMessage in configuration.Messages.NotFound.RandomElement())
                    yield return new Message(notfoundMessage);

                foreach (var feedbackMessage in configuration.Messages.Feedback.RandomElement())
                    yield return new Message(feedbackMessage);
            }

            return webResults.Any()
                ? new YoungCarersAustria.Chatbot.Data.Web.Answer.Found(ResultsFound().ToList())
                : new YoungCarersAustria.Chatbot.Data.Web.Answer.NotFound(NoResultsFound().ToList());
        default:
            throw new Exception("Invalid Platform");
    }
}

app.Run();

Platform GetPlatform(HttpContext context)
{
    var userAgent = context.Request.Headers["User-Agent"];
    var clientInfo = Parser.GetDefault().Parse(userAgent);
    var platform = clientInfo.UA.Family switch
    {
        "Young%20Carers%20Austria" => Platform.iOS,  // User-Agent of the iOS-App is "Young%20Carers%20Austria 6" (ref: https://stackoverflow.com/questions/36379347/does-nsurlsession-send-user-agent-automatically)
        "okhttp" => Platform.Android, // User-Agent of the Android-App is "okhttp"
        _ => Platform.Web
    };
    return platform;
}
enum Platform { iOS, Android, Web }