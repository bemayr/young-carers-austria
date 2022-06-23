import deepEqual from "deep-equal";

export async function runWebsiteBuild(
  originalItem: any,
  newItem: any,
  url: string | undefined
) {
  const { lastUpdated: lastUpdatedOldOne, ...oldOne } = originalItem;
  const { lastUpdated: lastUpdatedNewOne, ...newOne } = newItem;

  const isDataMigration = url?.includes("/data/migrate");
  const isLinkChecker = url?.includes("/links/validate");
  const isProduction = process.env.NODE_ENV === "production";
  const isDataChange = !deepEqual(oldOne, newOne);

  if (isDataMigration || isLinkChecker) return;
  if (isProduction && isDataChange)
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
