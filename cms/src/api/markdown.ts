import { Text } from 'slate';
import escapeHtml from "escape-html";

type Options = {
    listType: "ordered" | "unordered",
    listDepth: number
}

function transformWhitespacePreserving(text: string, convert: (text: string) => string): string {
    return text.replace(text.trim(), convert(text.trim()))
}

export function slateToMarkdown(children: any[] | undefined, options: Options | undefined = undefined): string | null {
    if (!children) return null
    return children.map(node => {
        if (Text.isText(node)) {
            if (node.text === "") return null
            // @ts-ignore
            if (node.bold) return transformWhitespacePreserving(node.text, text => `**${text}**`)
            // @ts-ignore
            if (node.italic) return transformWhitespacePreserving(node.text, text => `_${text}_`)
            return node.text
        }

        if (!node) return null

        switch (node.type) {
            case 'h1': return `# ${slateToMarkdown(node.children)}\n\n`;
            case 'h2': return `## ${slateToMarkdown(node.children)}\n\n`;
            case 'h3': return `### ${slateToMarkdown(node.children)}\n\n`;
            case 'h4': return `#### ${slateToMarkdown(node.children)}\n\n`;
            case 'h5': return `##### ${slateToMarkdown(node.children)}\n\n`;
            case 'h6': return `###### ${slateToMarkdown(node.children)}\n\n`;
            // todo: this sounds kind of suspiscious
            case undefined:
            case 'p':
            case 'paragraph':
                return `${slateToMarkdown(node.children)}\n\n`;
            case 'quote': return `> ${slateToMarkdown(node.children)}\n\n`;
            case 'ul': return `${slateToMarkdown(node.children, { listType: 'unordered', listDepth: (options?.listDepth ?? -1) + 1 })}\n`;
            case 'ol': return `${slateToMarkdown(node.children, { listType: 'ordered', listDepth: (options?.listDepth ?? -1) + 1 })}\n`;
            case 'li':
                switch (options?.listType) {
                    case "unordered": return `${" ".repeat(options.listDepth * 2)}* ${slateToMarkdown(node.children)}\n`;
                    case "ordered": return `${" ".repeat(options.listDepth * 2)}1. ${slateToMarkdown(node.children)}\n`;
                }
            case 'link': return `[${slateToMarkdown(node.children)}](${escapeHtml(node.url)})`;
            default: return slateToMarkdown(node.children, options);
        }
    }).join("").replace(/(?<=.)(?<!  )\n((?=.)|$)/g, "  \n");
}

export const markdownify = (content: {
    [k: string]: unknown;
  }[]) => slateToMarkdown(content)?.trim()
