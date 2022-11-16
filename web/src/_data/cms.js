// inspired from: https://www.mikestreety.co.uk/blog/creating-an-11ty-collection-from-json-api/

const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
  const baseUrl = 'https://redaktion.young-carers-austria.at/api/v1/';
  const endpoint = (path) => new URL(path, baseUrl).href;
  const options = { duration: '15min', type: 'json' };

  const content = await EleventyFetch(endpoint('content'), options);
  const app = await EleventyFetch(endpoint('app'), options);
  const website = await EleventyFetch(endpoint('website'), options);

  return { content, app, website };
};
