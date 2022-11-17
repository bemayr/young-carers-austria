const fs = require('fs');
const { DateTime } = require('luxon');

const { EleventyRenderPlugin } = require('@11ty/eleventy');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const slinkity = require('slinkity');

const extractExcerpt = require('./excerpt');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addFilter('date', (dateObj) => {
    return DateTime.fromISO(dateObj)
      .setLocale('de-AT')
      .toLocaleString(DateTime.DATETIME_MED);
  });

  // Configure the Directory Output Plugin
  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(directoryOutputPlugin);

  // Static assets to pass through
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/public');
  eleventyConfig.addPassthroughCopy('./src/styles');
  eleventyConfig.addPassthroughCopy('./src/main.js');

  eleventyConfig.addPlugin(
    slinkity.plugin,
    slinkity.defineConfig({
      // optional: use slinkity.defineConfig
      // for some handy autocomplete in your editor
    }),
  );

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addShortcode('excerpt', (extendedRichtext) =>
    extractExcerpt(extendedRichtext),
  );

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js'],
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
