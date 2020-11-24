const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

const getFiles = (dir, buffDir = '') => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(getFiles(filePath, file));
    } else {
      /* Is a file */
      results.push(`${buffDir}/${file}`);
    }
  });
  return results;
};

const getFolders = (dir, buffDir = '') => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results.push(`${buffDir}/${file}`);
      results = results.concat(getFolders(filePath, file));
    }
  });
  return results;
};

getFolders(target)
  .forEach((dir) => {
    const folderPath = `${destination}/${dir}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });

getFiles(target)
  .forEach((image) => {
    const fileName = `${destination}/${image.split('.')
      .slice(0, -1)
      .join('.')}`;
    const extension = image.split('.')[1];
    const fileNameLarge = `${fileName}-large.${extension}`;
    const fileNameMedium = `${fileName}-medium.${extension}`;
    const fileNameSmall = `${fileName}-small.${extension}`;
    // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
    if (!fs.existsSync(fileNameLarge)) {
      sharp(`${target}/${image}`)
        .resize(800)
        .toFile(path.resolve(__dirname, fileNameLarge));
    }

    // mengubah ukuran gambar dengan lebar 600px, dengan prefix -medium.jpg
    if (!fs.existsSync(fileNameMedium)) {
      sharp(`${target}/${image}`)
        .resize(600)
        .toFile(path.resolve(__dirname, fileNameMedium));
    }

    // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
    if (!fs.existsSync(fileNameSmall)) {
      sharp(`${target}/${image}`)
        .resize(480)
        .toFile(path.resolve(__dirname, fileNameSmall));
    }
  });
