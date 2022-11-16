using System.Net.Http.Json;

namespace YoungCarersAustria.Chatbot.Data
{
    public class DataGetter
    {
        public static async Task<(Configuration configuration, Content content)> Load()
        {
            using HttpClient httpClient = new()
            {
                BaseAddress = new Uri("https://redaktion.young-carers-austria.at/api/v1/"),
            };

            var configuration = await httpClient.GetFromJsonAsync<Configuration>("chatbot") ?? throw new Exception("Configuration could not be loaded from CMS");
            var content = await httpClient.GetFromJsonAsync<Content>("content") ?? throw new Exception("Content could not be loaded from CMS");

            return (configuration, content);
        }
    }
}
