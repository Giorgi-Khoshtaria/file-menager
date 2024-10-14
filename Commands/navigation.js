// navigation.js
import path from "path";
import fs from "fs";
import { chdir } from "process";

export const up = (currentDir) => {
  const newDir = path.resolve(currentDir, "..");
  return newDir !== currentDir ? newDir : currentDir;
};

export const cd = (currentDir, dir) => {
  const newDir = path.resolve(currentDir, dir);

  try {
    if (fs.existsSync(newDir) && fs.lstatSync(newDir).isDirectory()) {
      chdir(newDir);
      return newDir;
    } else {
      console.log(`Error: ${newDir} is not a valid directory`);
      return currentDir;
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return currentDir;
  }
};

export const list = () => {
  const currentDir = process.cwd();
  fs.readdir(currentDir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const directories = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);
    directories.sort();
    files.sort();
    const sortedEntries = [...directories, ...files].map((entry) => {
      return {
        name: entry,
        type: fs.statSync(`${currentDir}/${entry}`).isDirectory()
          ? "directory"
          : "file",
      };
    });

    console.log("Content of the directory:");
    sortedEntries.forEach((entry) => {
      console.log(`${entry.name} - ${entry.type}`);
    });
  });
};
