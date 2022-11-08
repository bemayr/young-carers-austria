import { PayloadHandler } from "payload/dist/config/types";
import {Kategorie, Quelle, Referenz} from "../payload-types"
import { slateToMarkdown } from "./markdown"

const makeLookup = (array: Array<{id: unknown}>) =>
    Object.fromEntries(array.map(item => [item.id, item]));

export const contentV1: PayloadHandler = async ({ payload }, res) => {

    const categories = await payload.find<Kategorie>({
        collection: "categories",
        depth: 1,
        limit: 1000,
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

  res.json({state: "success", categories, references, sources})
}
