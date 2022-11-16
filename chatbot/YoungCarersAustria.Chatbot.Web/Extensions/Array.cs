namespace YoungCarersAustria.Chatbot.Web.Extensions
{
    public static class ArrayExtensions
    {
        // The random number generator.
        private static readonly Random Rand = new();

        // Return a random item from an array.
        public static T RandomElement<T>(this T[] items)
        {
            // Return a random item.
            return items[Rand.Next(0, items.Length)];
        }

        // Return a random item from a list.
        public static T RandomElement<T>(this IList<T> items)
        {
            // Return a random item.
            return items[Rand.Next(0, items.Count)];
        }

        // Return a random item from a list.
        public static T RandomElement<T>(this IReadOnlyList<T> items)
        {
            // Return a random item.
            return items[Rand.Next(0, items.Count)];
        }
    }
}
