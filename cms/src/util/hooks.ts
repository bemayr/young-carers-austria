import { PayloadRequest } from 'payload/types';

function isNotDraft(document: any): boolean {
  return document && (!("_status" in document) || document._status === "published")
}

function isNonBatchedChange(url: string | undefined): boolean {
  const isDataMigration = url?.includes("/data/migrate")
  const isLinkChecker = url?.includes("/links/validate")
  return !(isDataMigration || isLinkChecker)
}

async function runWebsiteBuildIfProduction() {
  const isProduction = process.env.NODE_ENV === "production";

  console.info(`🛠️ Initiating Website Rebuild (env: ${process.env.NODE_ENV})`)

  if (isProduction)
    await fetch(
      "https://api.github.com/repos/bemayr/young-carers-austria/dispatches",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.GITHUB_ACTIONS_TOKEN}`,
        }),
        body: JSON.stringify({ event_type: "cms_content_changed" }),
      }
    );
}

async function refreshChatbotIndexIfProduction() {
  const isProduction = process.env.NODE_ENV === "production";

  console.info(`🤖 Refresh Chatbot Index (env: ${process.env.NODE_ENV})`)

  if (isProduction)
    await fetch(
      "https://redaktion.young-carers-austria.at/api/v1/index/rebuild",
      {
        method: "POST"
      }
    );
}

export const notifyGitHub = ({ doc, req }: { doc: any, req: PayloadRequest<any> }) => {
  if(isNotDraft(doc) && isNonBatchedChange(req.url))
    runWebsiteBuildIfProduction() // intentionally run sync because of fire-and-forget semantics
  if(doc) return doc
}

export const notifyChatbot = ({ doc, req }: { doc: any, req: PayloadRequest<any> }) => {
  if(isNotDraft(doc) && isNonBatchedChange(req.url))
    refreshChatbotIndexIfProduction() // intentionally run sync because of fire-and-forget semantics
  if(doc) return doc
}
