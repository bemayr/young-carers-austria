module.exports = {
  data: {
    permalink: (data) => `api/${data.page.fileSlug}.json`,
  },
  render: (data) => JSON.stringify(data.cms, null, 2)
}
