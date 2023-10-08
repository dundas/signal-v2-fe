const { fromBuffer } = require('pdf2pic');
const fs = require('fs').promises;
const path = require('path');

async function convertPdfToImages(buffer) {
  try {
    const options = {
      density: 100,
      saveFilename: "output",
      savePath: "./images",
      format: "png",
      width: 600,
      height: 600
    };

    // Ensure the savePath directory exists
    await fs.mkdir(path.resolve(options.savePath), { recursive: true });

    const storeAsImage = fromBuffer(buffer, options);
    const pagesToConvertAsImages = [1];

    const imageFiles = await Promise.all(
      pagesToConvertAsImages.map((pageNumber) => storeAsImage(pageNumber))
    );

    // Read the image files back into memory
    const imageBuffers = await Promise.all(
      imageFiles.map((file) => fs.readFile(file.path))
    );

    // Optionally, delete the image files
    await Promise.all(imageFiles.map((file) => fs.unlink(file.path)));

    return imageBuffers;
  } catch (err) {
    console.error('Error converting PDF to images:', err);
    throw err;
  }
}