// index.js
import os from "os";
import readline from "readline";
import { up, cd, list } from "./Commands/navigation.js";
import {
  getEOL,
  getCPUs,
  getHomeDir,
  getUsername,
  getArchitecture,
} from "./Commands/osInfo.js";
import { cat, add, rn, cp, mv, rm } from "./Commands/fileOperations.js"; // Ensure this import is correct
import { stdin } from "node:process";
import { getUserName } from "./utils.js";

const app = () => {
  stdin.setEncoding("utf-8");
  const userName = getUserName() || "User";
  console.log(`Parsed username: ${userName}`);
  console.log(`Welcome to the File Manager, ${userName}!`);

  const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()}`);
  };

  printCurrentDirectory();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => {
    const command = input.trim();
    if (command === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit(0);
    }

    const [cmd, ...args] = command.split(" ");

    switch (cmd) {
      case "up":
        process.chdir(up(process.cwd()));
        printCurrentDirectory();
        break;
      case "cd":
        if (args.length) {
          process.chdir(cd(process.cwd(), args[0]));
          printCurrentDirectory();
        } else {
          console.log("Error: No path provided for cd.");
        }
        break;
      case "ls":
        list();
        break;
      case "cat":
        if (args.length) {
          cat(args[0]);
        } else {
          console.log("Error: No file path provided for cat.");
        }
        break;
      case "add":
        if (args.length) {
          add(args[0]);
        } else {
          console.log("Error: No file name provided to add.");
        }
        break;
      case "rn":
        if (args.length === 2) {
          rn(args[0], args[1]);
        } else {
          console.log(
            "Error: Provide source and destination file names for renaming."
          );
        }
        break;
      case "cp":
        if (args.length === 2) {
          cp(args[0], args[1]);
        } else {
          console.log(
            "Error: Provide source and destination paths for copying."
          );
        }
        break;
      case "mv":
        if (args.length === 2) {
          mv(args[0], args[1]);
        } else {
          console.log(
            "Error: Provide source and destination paths for moving."
          );
        }
        break;
      case "rm":
        if (args.length) {
          rm(args[0]);
        } else {
          console.log("Error: No file path provided for deletion.");
        }
        break;
      case "os":
        if (args.length > 0) {
          switch (args[0]) {
            case "--EOL":
              getEOL();
              break;
            case "--cpus":
              getCPUs();
              break;
            case "--homedir":
              getHomeDir();
              break;
            case "--username":
              getUsername();
              break;
            case "--architecture":
              getArchitecture();
              break;
            default:
              console.log(`Unknown OS command: ${args[0]}`);
          }
        }
      default:
        console.log(`Command not recognized: ${cmd}`);
    }
  });

  rl.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rl.close();
    process.exit();
  });
};

app();
