// inspired from: https://www.mikestreety.co.uk/blog/creating-an-11ty-collection-from-json-api/

const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  let url = "http://yc-backend.projekte.fh-hagenberg.at/api/v2";

	/* This returns a promise */
	const response = await Cache(url, {
		duration: "4h", // save for 4 hours
		type: "json" // we’ll parse JSON for you
	});

  return response
};
