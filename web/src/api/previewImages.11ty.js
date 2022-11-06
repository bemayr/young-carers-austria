module.exports = {
  data: {
    // this is needed so that vite integrates that into the bundle: https://vitejs.dev/guide/assets.html#the-public-directory
    permalink: (data) => `public/api/${data.page.fileSlug}.json`,
  },
  render: (data) =>
    JSON.stringify(
      data.previewImages.map(
        (image) =>
          `https://www.young-carers-austria.at/images/preview/${image}`, // TODO: get rid of this static value
      ),
      null,
      2,
    ),
};
