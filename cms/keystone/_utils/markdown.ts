import { Node, Text } from "slate";
import escapeHtml from "escape-html";

export function nodeToMarkdown(node: Node): string {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `**${string}**`;
    }
    return string;
  }

  const children = node.children.map((n) => nodeToMarkdown(n)).join("");

  switch (node.type) {
    case "paragraph":
      return `${children}\r\n\r\n`;
    case "link":
      return `[${children}](${escapeHtml(node.href)})`;
    case "unordered-list":
      return `\r\n${node.children
        .map((n) => `* ${nodeToMarkdown(n)}`)
        .join(`\r\n`)}\r\n\r\n`;
    case "ordered-list":
      return `\r\n${node.children
        .map((n) => `1. ${nodeToMarkdown(n)}`)
        .join(`\r\n`)}\r\n\r\n`;
    default:
      return children;
  }
}

export function slateToMarkdown(documentValue: any) {
  const node = { children: JSON.parse(documentValue) };
  const markdown = nodeToMarkdown(node).trim();
  return markdown;
}
