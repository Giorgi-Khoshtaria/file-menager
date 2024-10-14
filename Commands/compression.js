import path from "path";
import fs from "fs";
import zlib from "zlib";

const __dirname = path.resolve();
const filesDir = path.join(__dirname, "files");

export const compress = (fileName, destination) => {
  const sourcePath = path.join(filesDir, fileName);
  const destPath = path.join(filesDir, destination);

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  const brotliCompress = zlib.createBrotliCompress();

  readStream
    .pipe(brotliCompress)
    .pipe(writeStream)
    .on("finish", () => {
      console.log(`File ${fileName} compressed to ${destination}.`);
    })
    .on("error", (err) => {
      console.error(`Error compressing file: ${err.message}`);
    });
};

export const decompress = (fileName, destination) => {
  const sourcePath = path.join(filesDir, fileName);
  const destPath = path.join(filesDir, destination);

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  const brotliDecompress = zlib.createBrotliDecompress();

  readStream
    .pipe(brotliDecompress)
    .pipe(writeStream)
    .on("finish", () => {
      console.log(`File ${fileName} decompressed to ${destination}.`);
    })
    .on("error", (err) => {
      console.error(`Error decompressing file: ${err.message}`);
    });
};
