const fs = require('fs');
const { DateTime } = require('luxon');

const { EleventyRenderPlugin } = require('@11ty/eleventy');
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');

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

  // Static assets to pass through
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/public');
  eleventyConfig.addPassthroughCopy('./src/styles');
  eleventyConfig.addPassthroughCopy('./src/main.js');

  // TODO: https://github.com/matthiasott/eleventy-plus-vite/issues/2
  // TODO: https://github.com/matthiasott/eleventy-plus-vite/issues/4
  eleventyConfig.setServerPassthroughCopyBehavior('copy');

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: 'public',
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true,
      },
      appType: 'custom',
      assetsInclude: ['**/*.xml', '**/*.txt'],
      build: {
        mode: 'production',
        sourcemap: 'true',
        manifest: true,
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: 'assets/css/main.[hash].css',
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js',
          },
        },
      },
    },
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js'],
    passthroughFileCopy: true,
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
