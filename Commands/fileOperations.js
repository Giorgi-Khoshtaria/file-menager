import path from "path";
import fs from "fs";

const __dirname = path.resolve();
const filesDir = path.join(__dirname, "files");

export const add = (fileName) => {
  const fullPath = path.join(filesDir, fileName); // Use the full file path

  fs.writeFile(fullPath, "", (err) => {
    if (err) {
      console.error(`Error creating file: ${err.message}`);
    } else {
      console.log(`File ${fileName} created in ${filesDir}.`);
    }
  });
};

export const cat = (filePath) => {
  const fullPath = path.join(filesDir, filePath);
  const readStream = fs.createReadStream(fullPath);

  readStream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  readStream.pipe(process.stdout);
};

export const rn = (oldFileName, newFileName) => {
  const oldPath = path.join(filesDir, oldFileName);
  const newPath = path.join(filesDir, newFileName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
    } else {
      console.log(`File renamed from ${oldFileName} to ${newFileName}.`);
    }
  });
};

export const cp = (sourceFile, destinationPath) => {
  const sourcePath = path.join(filesDir, sourceFile);
  const destPath = path.join(filesDir, destinationPath, sourceFile); // Ensure copying within the files directory

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  writeStream.on("error", (err) => {
    console.error(`Error writing file: ${err.message}`);
  });

  readStream.pipe(writeStream).on("finish", () => {
    console.log(`File copied from ${sourcePath} to ${destPath}.`);
  });
};

export const mv = (sourceFile, destinationPath) => {
  cp(sourceFile, destinationPath);
  const sourcePath = path.join(filesDir, sourceFile);

  fs.unlink(sourcePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log(`File moved from ${sourcePath} to ${destinationPath}.`);
    }
  });
};

export const rm = (fileName) => {
  const filePath = path.join(filesDir, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log(`File ${fileName} deleted.`);
    }
  });
};
