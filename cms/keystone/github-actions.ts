export function isNonBatchedChange(url: string | undefined): boolean {
  const isDataMigration = url?.includes("/data/migrate");
  const isLinkChecker = url?.includes("/links/validate");
  return !(isDataMigration || isLinkChecker);
}

export async function runWebsiteBuildIfProduction() {
  const isProduction = process.env.NODE_ENV === "production";

  console.info(`🛠️ Initiating Website Rebuild`)

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
