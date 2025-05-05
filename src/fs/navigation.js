import { readdir } from "fs/promises";
import { cwd, chdir } from "process";
import { homedir } from "os";

export const listFiles = async () => {
  try {
    const files = await readdir(cwd(), { withFileTypes: true });
    const sortedFiles = files.sort((a, b) =>
      a.isDirectory() === b.isDirectory() ? a.name.localeCompare(b.name) : a.isDirectory() ? -1 : 1
    );

    console.table(sortedFiles.map(file => ({
      Name: file.name,
      Type: file.isDirectory() ? "Folder" : "File",
    })));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const changeDirectory = async (path) => {
    try {
      chdir(path);
      console.log(`✅ Перешли в: ${cwd()}`);
    } catch (error) {
      console.error("Error: folder is not found.");
    }
};

export const goUp = async () => {
    if (cwd() === homedir()) {
      console.log("You cannot go above the root directory.");
      return;
    }
    chdir("..");
    console.log(`Moved to: ${cwd()}`);
};
