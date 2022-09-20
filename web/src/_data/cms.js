// inspired from: https://www.mikestreety.co.uk/blog/creating-an-11ty-collection-from-json-api/

const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
  let url =
    process.env.ELEVENTY_PRODUCTION
      ? "https://redaktion.young-carers-austria.at/api/v2"
      : "http://localhost:3000/api/v2/";

  /* This returns a promise */
  const response = await Cache(url, {
    duration: "15min", // save for 4 hours
    type: "json", // we’ll parse JSON for you
  });

  return response;
};
