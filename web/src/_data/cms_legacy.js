// inspired from: https://www.mikestreety.co.uk/blog/creating-an-11ty-collection-from-json-api/

const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
  let url = process.env.ELEVENTY_PRODUCTION
    ? 'https://redaktion.young-carers-austria.at/api/v2'
    : 'https://redaktion.young-carers-austria.at/api/v2';

  /* This returns a promise */
  const response = await EleventyFetch(url, {
    duration: '15min', // save for 4 hours
    type: 'json', // we’ll parse JSON for you
  });

  // todo: get rid of this hack when new CMS gets deployed
  response.metadata[2].title = "Barrierefreiheitserklärung"
  response.metadata[3].title = "Datenschutzerklärung"

  function startsWithDigit(v) {
    const ch = v[0];
    return ch >= "0" && ch <= "9";
  }

  response.abc.sort((a, b) => {
    a = String(a.name);
    b = String(b.name);
    adigit = startsWithDigit(a);
    bdigit = startsWithDigit(b);
    if (adigit == bdigit) {
        return a.localeCompare(b);
    } else if (adigit) {
      console.log({digit: a})
        return 1;
    } else {
        return -1;
    }
  });
  
  return response;
};
