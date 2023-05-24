using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using YoungCarersAustria.Chatbot.Data.Web;

namespace YoungCarersAustria.Chatbot.Search
{
    public class WebSearcher : Searcher
    {
        private DirectoryReader reader;
        private IndexSearcher searcher;

        private Dictionary<string, Category> categoryLookup = new() { };
        private Dictionary<string, Reference> referenceLookup = new() { };
        private Dictionary<string, Situation> situationsLookup = new() { };
        private Dictionary<string, FAQ.Entry> faqsLookup = new() { };

        public void Index(Content content)
        {
            writer.DeleteAll();

            void AddDocuments<T>(IReadOnlyList<T> items, Func<T, Document> createDocument)
                => writer.AddDocuments(items.Select(createDocument));

            AddDocuments(content.Categories, category => new()
            {
                new StoredField(name: "id", category.Id),
                new StoredField(name: "type", "category"),
                new TextField(name: "name", category.Name, Field.Store.NO) { Boost = 3f },
                new TextField(name: "title", category.Heading, Field.Store.NO) { Boost = 1.5f },
                new TextField(name: "description", category.DescriptionPlain, Field.Store.NO) { Boost = 1f },
                new TextField(name: "keywords", category.Keywords, Field.Store.NO) { Boost = .5f },
            });
            AddDocuments(content.References, reference => new()
            {
                new StoredField(name: "id", reference.Id),
                new StoredField(name: "type", "reference"),
                new TextField(name: "title", reference.Title, Field.Store.NO) { Boost = 2f },
                new TextField(name: "description", reference.Description, Field.Store.NO),
                new TextField(name: "keywords", reference.Keywords, Field.Store.NO) { Boost = .5f },
            });
            AddDocuments(content.Situations, situation => new()
            {
                new StoredField(name: "id", situation.Id),
                new StoredField(name: "type", "situation"),
                new TextField(name: "name", situation.Name, Field.Store.NO) { Boost = 2.5f },
                new TextField(name: "description", situation.ContentPlain, Field.Store.NO) { Boost = 1f },
            });
            AddDocuments(content.Faqs, faq => new()
            {
                new StoredField(name: "id", faq.Id),
                new StoredField(name: "type", "faq"),
                new TextField(name: "name", faq.Question, Field.Store.NO) { Boost = 4f },
                new TextField(name: "description", faq.AnswerPlain, Field.Store.NO) { Boost = 1.5f },
            });

            writer.Commit();

            reader = writer.GetReader(applyAllDeletes: true);
            searcher = new IndexSearcher(reader);

            // create the lookups
            categoryLookup = content.Categories.ToDictionary(category => category.Id);
            referenceLookup = content.References.ToDictionary(reference => reference.Id);
            situationsLookup = content.Situations.ToDictionary(situation => situation.Id);
            faqsLookup = content.Faqs.ToDictionary(faq => faq.Id);
        }

        public async IAsyncEnumerable<Result> Find(string message)
        {
            BooleanQuery query = new();
            await foreach (var token in GetTokens(message))
            {
                query.Add(new TermQuery(new Term("name", token)), Occur.SHOULD);
                query.Add(new TermQuery(new Term("title", token)), Occur.SHOULD);
                query.Add(new TermQuery(new Term("description", token)), Occur.SHOULD);
                query.Add(new FuzzyQuery(new Term("keyword", token), maxEdits: 1), Occur.SHOULD);
            }

            var results = await Task.Run(() => searcher.Search(query, n: 5));

            foreach (var hit in (await Task.Run(() => searcher.Search(query, n: 5))).ScoreDocs)
                yield return searcher.Doc(hit.Doc).Get("type") switch
                {
                    "category" => new Result.Category(categoryLookup[searcher.Doc(hit.Doc).Get("id")]),
                    "reference" => new Result.Reference(referenceLookup[searcher.Doc(hit.Doc).Get("id")]),
                    "situation" => new Result.Situation(situationsLookup[searcher.Doc(hit.Doc).Get("id")]),
                    "faq" => new Result.FAQ(faqsLookup[searcher.Doc(hit.Doc).Get("id")]),
                    _ => throw new NotImplementedException(),
                };
        }
    }
}
