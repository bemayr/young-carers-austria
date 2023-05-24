using Microsoft.Extensions.Configuration;
using YoungCarersAustria.Chatbot.Data;
using YoungCarersAustria.Chatbot.Data.App;
using YoungCarersAustria.Chatbot.Search;

var data = await DataGetter.Load();
var searcher = new WebSearcher();
searcher.Index(data.content);

void TestTokenization(string phrase)
{
    Console.WriteLine($"tokenizing and stemming: \"{phrase}\"");
    foreach (var token in searcher.GetTokens(phrase))
    {
        Console.WriteLine($"- {token}");
    }
    Console.WriteLine();
}

void TestSearch(string phrase)
{
    Console.WriteLine($"searching for: \"{phrase}\"");
    var results = searcher.Find(phrase);
    if (results == null)
        Console.WriteLine("Es konnten leider keine Ergebnisse gefunden werden...");
    else
        foreach (var result in results)
            Console.WriteLine($"- {(result as Result.Reference)?.reference.Title}");
    Console.WriteLine();
}

TestTokenization("Wie bekomme ich Pflegegeld?");
TestTokenization("Hallo Lisa, wie helfe ich meiner Oma im Notfall?");
TestTokenization("Wie viele Wörter aus diesem Satz werden denn verworfen bzw. verändert?");

TestSearch("Pflege");
TestSearch("Pflegegeld");
TestSearch("bekomme");
TestSearch("Wie bekomme ich Pflegegeld?");
TestSearch("Wie bekomme ich Pflegegeld");
TestSearch("Hallo Lisa, wie helfe ich meiner Oma im Notfall?");
TestSearch("Wie viele Wörter aus diesem Satz werden denn verworfen bzw. verändert?");
TestSearch("Gibt es auch in der Schweiz Angebote?");
TestSearch("Und in Basel?");
