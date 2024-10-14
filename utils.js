import { argv } from "node:process";

export const getUserName = () => {
  const argArray = process.argv.slice(2);
  console.log(argArray, "args");
  const arg = argArray.find((arg) => arg.startsWith("--username"));

  if (arg) {
    return arg.split("=")[1];
  }

  return null;
};

export const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};
