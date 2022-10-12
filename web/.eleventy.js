const fs = require('fs');

module.exports = function (config) {
  config.setLiquidOptions({
    dynamicPartials: true,
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/public');
  config.addPassthroughCopy('./src/styles');
  config.addPassthroughCopy('./src/main.js');

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
