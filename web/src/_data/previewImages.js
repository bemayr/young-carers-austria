const path = require('path');
const fs = require('fs');

module.exports = async function () {
  const previewImagesFolder = path.resolve(__dirname, '../public/images/preview');
  const imageNames = await fs.promises.readdir(previewImagesFolder);
  return imageNames;
};
