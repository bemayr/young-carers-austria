module.exports = {
  data: {
    permalink: (data) => `${data.page.fileSlug}.json`,
  },
  render: (data) => JSON.stringify(data.cms, null, 2),
};
