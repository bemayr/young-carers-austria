const path = require("path");
const fs = require("fs");

module.exports = async function () {
  const previewImagesFolder = path.resolve(
    __dirname,
    "../static/images/preview"
  );
  const imageNames = await fs.promises.readdir(previewImagesFolder);

  console.log(imageNames);

  return imageNames;
};
