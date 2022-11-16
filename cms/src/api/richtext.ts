import { slateToMarkdown } from "./markdown";

export type ExtendedRichText =
| {
    children: any[];
  }
| { children: any[]; type: string; relationTo: string; value: any };

export const transformExtendedRichText = (
children: ExtendedRichText[]
): any => {
return children
  .reduce((result, node) => {
    if ("type" in node && node.type === "relationship") {
      switch (node.relationTo) {
        case "categories":
          return [
            ...result,
            { type: "category", category: node.value.id },
          ];
        case "references":
          return [
            ...result,
            {
              type: "reference",
              reference: node.value.id,
            },
          ];
        default:
          return result;
      }
    } else {
      if (result.length === 0 || result.at(-1).type !== "text")
        return [...result, { type: "text", text: slateToMarkdown([node]) }];
      else {
        const prose = result.pop();
        prose.text = prose.text.concat(slateToMarkdown([node]) || "");
        return [...result, prose];
      }
    }
  }, [] as any[])
  .map(entry => entry.type === "text" ? { ...entry, text: entry.text.trim(), processed: true } : entry) // trim text entries
  .filter(({ type, text }) => !(type === "text" && /\S/.test(text))); // filter empty entries
};
