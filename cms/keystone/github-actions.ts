export async function runWebsiteBuild() {
  if (process.env.NODE_ENV === "production") {
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
}
