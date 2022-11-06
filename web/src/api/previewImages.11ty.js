const Image = require("@11ty/eleventy-img");

module.exports = {
  data: {
    // this is needed so that vite integrates that into the bundle: https://vitejs.dev/guide/assets.html#the-public-directory
    permalink: (data) => `public/api/${data.page.fileSlug}.json`,
  },
  render: async (data) =>
    {
      async function processImage(src) {
        return await Image(src, {
          widths: [2160],
          formats: ["png"],
          outputDir: "./_site/public/images/preview" // TODO: get rid of the _site
        });
      }

      const images = await Promise.all(
        data.previewImages.map(processImage)
      )

      return JSON.stringify(
        images.map(
          (image) => `https://www.young-carers-austria.at/images/preview/${image.png[0].filename}` // TODO: get rid of this static value
        ),
        null,
        2
      );
    },
};
