// index.js
import os from "os";
import readline from "readline";
import { up, cd, list } from "./Commands/navigation.js"; // Ensure this import is correct
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
