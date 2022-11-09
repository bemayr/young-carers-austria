import { Payload } from "payload";
import { PayloadHandler } from "payload/dist/config/types";
import { TypeWithVersion } from "payload/dist/versions/types";
import {Alltagssituation, FAQ, ImNotfall, Kategorie, Quelle, Referenz} from "../payload-types"
import { slateToMarkdown } from "./markdown"

const makeLookup = (array: Array<{id: unknown}>) =>
    Object.fromEntries(array.map(item => [item.id, item]));

    type ExtendedRichText = {
        children: any[]
    } |
    { children: any[], type: string, relationTo: string, value: any }

const transformExtendedRichText = (children: ExtendedRichText[]): any => {
    return children.reduce((result, node) => {
        if("type" in node && node.type === "relationship") {
            switch (node.relationTo) {
                case "categories": return [...result, { type: "category", category: categories.transform(node.value) }];
                case "references": return [...result, { type: "reference", reference: references.transform(node.value) }];
                default: return result
            }
        }
        else {
            if (result.length === 0 || result.at(-1).type !== "text")
                return [...result, { type: "text", text: slateToMarkdown([node]) }]
            else {
                const prose = result.pop()
                prose.text = prose.text.concat(slateToMarkdown([node]) || "")
                return [...result, prose]
            }
        }
    }, [] as any[])
    .filter(({type, text}) => !(type === "text" && text === "")) // filter empty entries
}

const faq = {
    transform: function(entry: FAQ["entries"][number]) {
        return {
            question: entry.question,
            originalAnswer: entry.answer,
            answer: slateToMarkdown(entry.answer),
            showOnLandingPage: entry.showOnLandingPage
        }
    },
    get: async (payload: Payload) => await payload
        .findGlobal<FAQ>({ slug: "faq" })
        .then(result => result.entries.map(faq.transform))
}

const emergency = {
    transform: function(entry: ImNotfall) {
        return {
            title: entry.title,
            description: slateToMarkdown(entry.description),
            numbers: entry.numbers.map(({label, number}) => ({label, number})),
            contentOriginal: entry.content,
            content: transformExtendedRichText(entry.content as ExtendedRichText[]),
            state: "done" // TODO: get rid of this
        }
    },
    get: async (payload: Payload) => await payload
        .findGlobal<ImNotfall>({ slug: "emergency" })
        .then(emergency.transform)
}

const situations = {
    transform: function(entry: Alltagssituation) {
        return {
            question: entry.name,
            contentOriginal: entry.content,
            content: transformExtendedRichText(entry.content as ExtendedRichText[]),
        }
    },
    get: async (payload: Payload) => await payload.find<Alltagssituation>({
        collection: "situations",
        depth: 1,
        limit: 1000,
        sort: '-createdAt',
        where: {
            _status: {
                equals: "published"
            }
        }
      })
      .then(result => result.docs)
        .then(entries => entries.map(situations.transform))
}

const categories = {
    transform: function(entry: Kategorie) {
        return {
            ...entry
        }
    },
}

const references = {
    transform: function(entry: Referenz) {
        return {
            ...entry
        }
    },
}

export const contentV1: PayloadHandler = async ({ payload }, res) => {


    const categories = await payload.find<Kategorie>({
        collection: "categories",
        depth: 1,
        limit: 1000,
        sort: '-createdAt',
        where: {
            _status: {
                equals: "published"
            }
        }
      })
      .then(result => result.docs)
      .then(categories => categories.map(category => ({...category, descriptionMarkdown: slateToMarkdown(category.description)})));

    const references = await payload.find<Referenz>({
        collection: "references",
        depth: 1,
        limit: 1000,
        where: {
            _status: {
                equals: "published"
            }
        }
      }).then(result => result.docs);

      const sources = await payload.find<Quelle>({
        collection: "sources",
        depth: 0,
        limit: 1000,
      }).then(result => result.docs);

      const sourcesLookup = makeLookup(sources)

    res.json({
        faqs: await faq.get(payload),
        emergency: await emergency.get(payload),
        insights: await situations.get(payload),
        abc: "todo",
        timestamp: new Date().toISOString()
    })
}
