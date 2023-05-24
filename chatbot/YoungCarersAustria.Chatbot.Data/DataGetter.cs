using System.Net.Http.Json;

namespace YoungCarersAustria.Chatbot.Data;

public class DataGetter
{
    public static async Task<Data> Load()
    {
        using HttpClient httpClient = new()
        {
            BaseAddress = new Uri(Environment.GetEnvironmentVariable("CMS_URL") ?? throw new Exception("CMS_URL not provided")),
        };

        var configuration = await httpClient.GetFromJsonAsync<Configuration>("api/v1/chatbot") ?? throw new Exception("Configuration could not be loaded from CMS");
        var appContent = await httpClient.GetFromJsonAsync<App.Content>("api/v1/content") ?? throw new Exception("App Content could not be loaded from CMS");

        var categories = (await httpClient.GetFromJsonAsync<Web.Collection<Web.Category>>("api/categories?depth=0&limit=1000&where[_status][equals]=published"))?.Docs ?? throw new Exception("Categories could not be loaded from CMS");
        var references = (await httpClient.GetFromJsonAsync<Web.Collection<Web.Reference>>("api/references?depth=0&limit=10000&where[_status][equals]=published"))?.Docs ?? throw new Exception("References could not be loaded from CMS");
        var insights = (await httpClient.GetFromJsonAsync<Web.Collection<Web.Situation>>("api/situations?depth=0&limit=100&where[_status][equals]=published"))?.Docs ?? throw new Exception("Situations could not be loaded from CMS");
        var faqs = (await httpClient.GetFromJsonAsync<Web.FAQ>("api/globals/faq"))?.Entries ?? throw new Exception("FAQs could not be loaded from CMS");
        var webContent = new Web.Content(categories, references, insights, faqs);

        return new Data(configuration, appContent, webContent);
    }
}
