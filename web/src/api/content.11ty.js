module.exports = {
  data: {
    // this is needed so that vite integrates that into the bundle: https://vitejs.dev/guide/assets.html#the-public-directory
    permalink: (data) => `public/api/${data.page.fileSlug}.json`,
  },
  render: (data) => JSON.stringify(data.cms_legacy, null, 2),
};
