using Lucene.Net.Analysis;
using Lucene.Net.Analysis.De;
using Lucene.Net.Analysis.TokenAttributes;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;

namespace YoungCarersAustria.Chatbot.Search
{
    public class Searcher
    {
        private const LuceneVersion LUCENE_VERSION = LuceneVersion.LUCENE_48;

        private readonly Lucene.Net.Store.Directory directory = new RAMDirectory();
        private readonly Analyzer germanAnalyzer = new GermanAnalyzer(LUCENE_VERSION);
        protected readonly IndexWriter writer;

        public Searcher()
        {
            writer = new(directory, new IndexWriterConfig(LUCENE_VERSION, germanAnalyzer) { OpenMode = OpenMode.CREATE });
        }

        public async IAsyncEnumerable<string> GetTokens(string text)
        {
            using TokenStream tokenStream = await Task.Run(() => germanAnalyzer.GetTokenStream("body", text));
            tokenStream.Reset();
            while (tokenStream.IncrementToken())
            {
                yield return tokenStream.GetAttribute<ICharTermAttribute>().ToString();
            }
            tokenStream.End();
            tokenStream.Dispose();
        }
    }
}