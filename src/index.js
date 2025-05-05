import { cwd } from "process";
import { listFiles, changeDirectory, goUp } from "./fs/navigation.js";

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "User";

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${cwd()}`);

process.stdin.on("data", async (input) => {
  const command = input.toString().trim().split(" ");

  if (command[0] === ".exit") {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  } else if (command[0] === "ls") {
    await listFiles();
  } else if (command[0] === "cd") {
    await changeDirectory(command[1]);
  } else if (command[0] === "up") {
    await goUp();
  } else {
    console.log("Invalid input");
  }
});
