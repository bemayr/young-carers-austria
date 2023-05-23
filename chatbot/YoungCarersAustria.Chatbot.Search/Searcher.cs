using Lucene.Net.Analysis.De;
using Lucene.Net.Analysis;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;
using Lucene.Net.QueryParsers.Classic;
using YoungCarersAustria.Chatbot.Data;
using Lucene.Net.Analysis.TokenAttributes;
using static System.Net.Mime.MediaTypeNames;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.QueryParsers.Surround.Query;

namespace YoungCarersAustria.Chatbot.Search
{
    public class Searcher : IDisposable
    {
        private const LuceneVersion LUCENE_VERSION = LuceneVersion.LUCENE_48;
        
        private Analyzer germanAnalyzer = new GermanAnalyzer(LUCENE_VERSION);
        private Lucene.Net.Store.Directory directory = new RAMDirectory();
        private IndexWriter writer;
        private DirectoryReader reader;
        private IndexSearcher searcher;
        private Dictionary<string, Insight> insightsLookup = new() { };
        private Dictionary<string, Category> categoryLookup = new() { };
        private Dictionary<string, Reference> referenceLookup = new() { };

        public Searcher()
        {
            writer = new(directory, new IndexWriterConfig(LUCENE_VERSION, germanAnalyzer) { OpenMode = OpenMode.CREATE });
        }

        public void Index(Content content)
        {
            writer.DeleteAll();

            #region Insights
            var insights = content.Insights.Select(insight => {
                var parts = insight.Parts.Where(part => part.Type == "text").Select(part => part.Text);

                // create document
                Document document = new()
                {
                    new StoredField(name: "id", insight.Question),
                    new StoredField(name: "type", "insight"),
                    new TextField(name: "name", insight.Question, Field.Store.NO) { Boost = 2.5f },
                    new TextField(name: "description", string.Join(Environment.NewLine, parts), Field.Store.NO) { Boost = 1f },
                };

                return document;
            });
            writer.AddDocuments(insights); // TODO: enable this
            #endregion
            #region Categories
            var categories = content.Categories.Select(category => {
                // create document
                Document document = new()
                {
                    new StoredField(name: "id", category.Id),
                    new StoredField(name: "type", "category"),
                    new TextField(name: "name", category.Name, Field.Store.NO) { Boost = 3f },
                    new TextField(name: "title", category.Title, Field.Store.NO) { Boost = 1.5f },
                    new TextField(name: "description", category.Information, Field.Store.NO) { Boost = 1f },
                };

                //// add keywords
                //foreach (string keyword in category.Keywords)
                //    document.Add(new TextField(name: "keyword", keyword, Field.Store.NO) { Boost = .5f });

                return document;
            });
            writer.AddDocuments(categories); // TODO: enable this // Hole.TemporarilyDisabled(writer.AddDocuments(categories), "this breaks the current iOS Chatbot");
            #endregion
            #region References
            var references = content.References.Select(reference => {
                // create document
                Document document = new()
                {
                    new StoredField(name: "id", reference.Id),
                    new StoredField(name: "type", "reference"),
                    new TextField(name: "title", reference.Title, Field.Store.NO) { Boost = 2f },
                    new TextField(name: "description", reference.Description, Field.Store.NO),
                };

                // add keywords
                foreach (string keyword in reference.Keywords)
                    document.Add(new TextField(name: "keyword", keyword, Field.Store.NO) { Boost = .5f });

                return document;
            });
            writer.AddDocuments(references);
            #endregion


            writer.Commit();

            reader = writer.GetReader(applyAllDeletes: true);
            searcher = new IndexSearcher(reader);

            // create the lookups
            insightsLookup = content.Insights.ToDictionary(category => category.Question);
            categoryLookup = content.Categories.ToDictionary(category => category.Id);
            referenceLookup = content.References.ToDictionary(reference => reference.Id);
        }

        public IEnumerable<Result>? Find(string message)
        {
            BooleanQuery query = new();
            foreach (var token in GetTokens(message))
            {
                query.Add(new TermQuery(new Term("name", token)), Occur.SHOULD);
                query.Add(new TermQuery(new Term("title", token)), Occur.SHOULD);
                query.Add(new TermQuery(new Term("description", token)), Occur.SHOULD);
                query.Add(new FuzzyQuery(new Term("keyword", token), maxEdits: 1), Occur.SHOULD);
            }

            TopDocs searchResult = searcher.Search(query, n: 5);

            var results = searchResult.ScoreDocs.Select<ScoreDoc, Result>(hit =>
                searcher.Doc(hit.Doc).Get("type") switch
                {
                    "insight" => new Result.Insight(insightsLookup[searcher.Doc(hit.Doc).Get("id")]),
                    "category" => new Result.Category(categoryLookup[searcher.Doc(hit.Doc).Get("id")]),
                    "reference" => new Result.Reference(referenceLookup[searcher.Doc(hit.Doc).Get("id")]),
                    _ => throw new NotImplementedException(),
                });

            return results.Any()
                ? results
                : null;
        }

        public IEnumerable<string> GetTokens(string text)
        {
            using TokenStream tokenStream = germanAnalyzer.GetTokenStream("body", text);
            tokenStream.Reset();
            while (tokenStream.IncrementToken())
            {
                yield return tokenStream.GetAttribute<ICharTermAttribute>().ToString();
            }
            tokenStream.End();
            tokenStream.Dispose();
        }

        public void Dispose()
        {
            writer.Dispose();
            reader.Dispose();
        }
    }
}
