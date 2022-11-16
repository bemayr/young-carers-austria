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
        private Dictionary<string, Reference> referenceLookup = new() { };

        public Searcher()
        {
            writer = new(directory, new IndexWriterConfig(LUCENE_VERSION, germanAnalyzer) { OpenMode = OpenMode.CREATE });
        }

        public void Index(Content content)
        {
            writer.DeleteAll();

            var documents = content.References.Select(reference => {
                // create document
                Document document = new()
                {
                    new StoredField(name: "id", reference.Id),
                    new TextField(name: "title", reference.Title, Field.Store.NO),
                    new TextField(name: "description", reference.Description, Field.Store.NO),
                };

                // add keywords
                foreach (string keyword in reference.Keywords)
                    document.Add(new TextField(name: "keyword", keyword, Field.Store.NO) { Boost = .5f });

                return document;
            });

            writer.AddDocuments(documents);
            writer.Commit();

            reader = writer.GetReader(applyAllDeletes: true);
            searcher = new IndexSearcher(reader);

            // create the reference lookup
            referenceLookup = content.References.ToDictionary(reference => reference.Id);
        }

        public IEnumerable<Result>? Find(string message)
        {
            // todo: keywords, sentence

            // original version
            //var queryParser = new QueryParser(LuceneVersion.LUCENE_48, "title", germanAnalyzer);
            //var query = queryParser.Parse(message);

            // MultiFieldQueryParser
            //var queryParser = new MultiFieldQueryParser(LuceneVersion.LUCENE_48, new[] { "title", /*"description,"*/ /*"keyword"*/ }, germanAnalyzer) { DefaultOperator = Operator.OR,  };
            //var query = queryParser.Parse(message);

            // final query
            BooleanQuery query = new();
            foreach (var token in GetTokens(message))
            {
                query.Add(new TermQuery(new Term("title", token)), Occur.SHOULD);
                query.Add(new TermQuery(new Term("description", token)), Occur.SHOULD);
                query.Add(new FuzzyQuery(new Term("keyword", token)), Occur.SHOULD);
            }

            TopDocs searchResult = searcher.Search(query, n: 5);

            var results = searchResult.ScoreDocs.Select(hit =>
                new Result.Reference(referenceLookup[searcher.Doc(hit.Doc).Get("id")]));

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
        }

        public void Dispose()
        {
            writer.Dispose();
            reader.Dispose();
        }
    }
}
