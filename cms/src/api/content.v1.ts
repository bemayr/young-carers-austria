import { Payload } from "payload";
import { PayloadHandler } from "payload/dist/config/types";
import { groupBy } from "../util/array";
import {Alltagssituation, Barrierefreiheitserklarung, Copyright, Datenschutzerklarung, FAQ, Hilfe, ImNotfall, Impressum, Infos, Kategorie, Quelle, Referenz, Willkommensnachricht} from "../payload-types"
import { slateToMarkdown } from "./markdown"

const makeLookup = (array: Array<{id: unknown}>) =>
    Object.fromEntries(array.map(item => [item.id, item]));

    type ExtendedRichText = {
        children: any[]
    } |
    { children: any[], type: string, relationTo: string, value: any }

const transformExtendedRichText = (children: ExtendedRichText[], categoryLookup: Record<string, any>): any => {
    return children.reduce((result, node) => {
        if("type" in node && node.type === "relationship") {
            switch (node.relationTo) {
                case "categories":
                    console.log({id: node.value.id, category: categoryLookup[node.value.id]})
                    return [...result, { type: "category", category: categoryLookup[node.value.id] }];
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
    transform: function(entry: ImNotfall, categoryLookup: Record<string, any>) {
        return {
            title: entry.title,
            description: slateToMarkdown(entry.description)?.trim(),
            numbers: entry.numbers.map(({label, number}) => ({label, number})),
            contentOriginal: entry.content,
            content: transformExtendedRichText(entry.content as ExtendedRichText[], categoryLookup),
            state: "done" // TODO: get rid of this, exists only for iOS backwards compatibility
        }
    },
    get: async (payload: Payload, categoryLookup: Record<string, any>) => await payload
        .findGlobal<ImNotfall>({ slug: "emergency" })
        .then(entry => emergency.transform(entry, categoryLookup))
}

const help = {
    transform: function(entry: Hilfe) {
        return {
            title: entry.title,
            description: slateToMarkdown(entry.description)?.trim(),
        }
    },
    get: async (payload: Payload) => await payload
        .findGlobal<Hilfe>({ slug: "help" })
        .then(help.transform)
}

const infos = {
    transform: function(entry: Infos) {
        return {
            title: entry.title,
            description: slateToMarkdown(entry.description)?.trim,
        }
    },
    get: async (payload: Payload) => await payload
        .findGlobal<Infos>({ slug: "infos" })
        .then(infos.transform)
}

const situations = {
    transform: function(entry: Alltagssituation, categoryLookup: Record<string, any>) {
        return {
            question: entry.name,
            contentOriginal: entry.content,
            content: transformExtendedRichText(entry.content as ExtendedRichText[], categoryLookup),
        }
    },
    get: async (payload: Payload, categoryLookup: Record<string, any>) => await payload.find<Alltagssituation>({
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
        .then(entries => entries.map(entry => situations.transform(entry, categoryLookup)))
}

const app = {
    a11y: {
        get: async (payload: Payload) => await payload
            .findGlobal<Barrierefreiheitserklarung>({ slug: "app-accessibility" })
            .then(result => slateToMarkdown(result.content)?.trim())
    },
    copyright: {
        get: async (payload: Payload) => await payload
            .findGlobal<Copyright>({ slug: "app-copyright" })
            .then(result => slateToMarkdown(result.content)?.trim())
    },
    gdpr: {
        get: async (payload: Payload) => await payload
            .findGlobal<Datenschutzerklarung>({ slug: "app-gdpr" })
            .then(result => slateToMarkdown(result.content)?.trim())
    },
    imprint: {
        get: async (payload: Payload) => await payload
            .findGlobal<Impressum>({ slug: "app-imprint" })
            .then(result => slateToMarkdown(result.content)?.trim())
    },
    welcome: {
        transform: function(entry: Willkommensnachricht) {
            return {
                hello: slateToMarkdown(entry.hello)?.trim(),
                info: slateToMarkdown(entry.info)?.trim(),
                feedback: slateToMarkdown(entry.feedback)?.trim(),
            }
        },
        get: async (payload: Payload) => await payload
            .findGlobal<Willkommensnachricht>({ slug: "app-welcome" })
            .then(app.welcome.transform)
    }
}

const categories = {
    transform: function(entry: Kategorie) {
        return {
            id: entry.id,
            name: entry.name,
            title: entry.heading,
            information: slateToMarkdown(entry.description)?.trim(),
        }
    },
    get: async (payload: Payload) => await payload.find<Kategorie>({
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
      .then(entries => entries.map(categories.transform))
}

const sources = {
    transform: function(entry: Quelle) {
        return {
            ownerName: entry.name,
            ownerUrl: entry.homepage ?? "",
        }
    },
    get: async (payload: Payload) => await payload.find<Quelle>({
        collection: "sources",
        depth: 0,
        limit: 1000,
      })
      .then(result => result.docs)
      .then(entries => entries.map(sources.transform))
}

const references = {
    transform: function(entry: Referenz) {
        return {
            url: entry.address,
            title: entry.title,
            description: entry.description,
            previewImageUrl: entry.image,
            isPaidcontent: entry.containsPaidContent,
            lastUpdated: entry.updatedAt,
            keywords: entry.keywords?.split(",").map(keyword => keyword.trim())
        }
    },
    get: async (payload: Payload) => await payload.find<Referenz>({
        collection: "references",
        depth: 1,
        limit: 1000,
        where: {
            _status: {
                equals: "published"
            }
        }
      })
      .then(result => result.docs)
}

export const contentV1: PayloadHandler = async ({ payload }, res) => {

    // === content ===
    const refsPayload = await references.get(payload)

    const refsFlattened = refsPayload.flatMap(reference => reference.categories.map(category => ({
        category: (category as Kategorie),
        reference: reference,
        source: (reference.source as Quelle)
    })))

    const refsGrouped = groupBy(refsFlattened, ref => ref.category.name)

    const result =
        Object.entries(refsGrouped)
        .map(([_, itemLevel0]) => ({
            ...categories.transform(itemLevel0[0].category),
            entries:
            Object.entries(
                groupBy(
                    itemLevel0.map(({source, reference}) => ({ source, reference})), ({source}) => source.id))
                    .map(([_, itemLevel1]) => ({
                        ...sources.transform(itemLevel1[0].source),
                        references: itemLevel1
                        .map(({ reference }) => reference)
                        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                        .map(references.transform)
                    }))
                    .sort((a, b) => a.ownerName.localeCompare(b.ownerName))
        }))


    const refs = result.sort((a, b) => a.name.localeCompare(b.name));

    const categoryLookup = makeLookup(refs)

    // === app ===
      const appWelcome = await app.welcome.get(payload)

    const appMetadata = [
        { key: "imprint", title: "Impressum", content: await app.imprint.get(payload) },
        { key: "copyright", title: "Copyright", content: await app.copyright.get(payload) },
        { key: "accessibility", title: "Datenschutzerklärung", content: await app.a11y.get(payload) },
        { key: "gdpr", title: "Barrierefreiheitserklärung", content: await app.gdpr.get(payload) },
        { key: "welcome-hello", title: "Kurzer Text auf der allerersten Seite der App", content: appWelcome.hello },
        { key: "welcome-info", title: "Information zur App in der Welcoming Experience", content: appWelcome.info },
        { key: "welcome-feedback", title: "Feedbackaufforderung in der Welcoming Experience", content: appWelcome.feedback },
    ]

    res.json({
        categoryLookup,
        faqs: await faq.get(payload),
        emergency: await emergency.get(payload, categoryLookup),
        help: await help.get(payload),
        infos: await infos.get(payload),
        insights: await situations.get(payload, categoryLookup),
        abc: refs,
        metadata: appMetadata,
        timestamp: new Date().toISOString()
    })
}
