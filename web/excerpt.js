const striptags = require('striptags');
const markdownItDefault = require('markdown-it');

const markdownIt = markdownItDefault({
    html: false,
    linkify: false,
    breaks: true
  });

function extractExcerpt(extendedRichtext) {
  if (!Array.isArray(extendedRichtext)) {
    console.warn(
      'Failed to extract excerpt: This does not seem to be ExtendedRichtext.',
    );
    return null;
  }

  const markdown = extendedRichtext
  .filter(part => part.type === "text")
  .map(part => part.text)
  .join("\n\n");

  const html = markdownIt.render(markdown)

  const excerpt = striptags(html)
    .substring(0, 200) // Cap at 200 characters
    // .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
    .trim()
    .concat('...');

    return excerpt
}

module.exports = extractExcerpt;
