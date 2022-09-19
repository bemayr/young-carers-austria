module.exports = {
  data: {
    permalink: (data) => `api/${data.page.fileSlug}.json`,
  },
  render: (data) => JSON.stringify(data.previewImages.map(name => `https://www.young-carers-austria.at/images/preview/${name}`), null, 2) // TODO: get rid of this static value
}
