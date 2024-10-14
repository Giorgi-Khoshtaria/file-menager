import fs from "fs";
import crypto from "crypto";
import path from "path";

const __dirname = path.resolve();

export const hash = (fileName) => {
  const fullPath = path.join(__dirname, "files", fileName);

  const hash = crypto.createHash("sha256");
  const readStream = fs.createReadStream(fullPath);

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  readStream.on("end", () => {
    const hashValue = hash.digest("hex");
    console.log(`Hash of file ${fullPath}: ${hashValue}`);
  });
};
