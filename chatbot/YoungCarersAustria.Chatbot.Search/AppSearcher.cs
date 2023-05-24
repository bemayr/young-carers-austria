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
using YoungCarersAustria.Chatbot.Data.App;

namespace YoungCarersAustria.Chatbot.Search
{
    public class AppSearcher : Searcher
    {
        private DirectoryReader reader;
        private IndexSearcher searcher;
        
        private Dictionary<string, Reference> referenceLookup = new() { };

        public void Index(Content content)
        {
            writer.DeleteAll();

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
            writer.Commit();

            reader = writer.GetReader(applyAllDeletes: true);
            searcher = new IndexSearcher(reader);

            // create the lookup
            referenceLookup = content.References.ToDictionary(reference => reference.Id);
        }

        public async IAsyncEnumerable<Result> Find(string message)
        {
            BooleanQuery query = new();
            await foreach (var token in GetTokens(message))
            {
                query.Add(new TermQuery(new Term("title", token)), Occur.SHOULD);
                query.Add(new TermQuery(new Term("description", token)), Occur.SHOULD);
                query.Add(new FuzzyQuery(new Term("keyword", token), maxEdits: 1), Occur.SHOULD);
            }

            var results = await Task.Run(() => searcher.Search(query, n: 5));

            foreach (var hit in (await Task.Run(() => searcher.Search(query, n: 5))).ScoreDocs)
                yield return searcher.Doc(hit.Doc).Get("type") switch
                {
                    "reference" => new Result.Reference(referenceLookup[searcher.Doc(hit.Doc).Get("id")]),
                    _ => throw new NotImplementedException(),
                };
        }
    }
}
