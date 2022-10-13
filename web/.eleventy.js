const fs = require('fs');
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const { DateTime } = require('luxon');

module.exports = function (config) {
  config.setLiquidOptions({
    dynamicPartials: true,
  });

  config.addPlugin(EleventyRenderPlugin);

  config.addFilter('date', (dateObj) => {
    return DateTime.fromISO(dateObj)
      .setLocale('de-AT')
      .toLocaleString(DateTime.DATETIME_MED);
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/public');
  config.addPassthroughCopy('./src/styles');
  config.addPassthroughCopy('./src/main.js');
  config.addPassthroughCopy('./src/CNAME');

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
