import { createReadStream,createWriteStream } from "fs";
import { unlink, rename } from "fs/promises";
import {resolve,basename,join } from "path";

export const readFile = async (filePath) => {
  try {console.log(filePath)
    const stream = createReadStream(filePath, { encoding: "utf-8" });
    stream.on("data", (chunk) => console.log(chunk));
    stream.on("error", () => console.error("Error:file os not found."));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const removeFile = async (filePath) => {
  try {
    await unlink(filePath);
    console.log(`File "${filePath}" removed!`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const copyFile = async (filePath, destination) => {
  try {
    const absoluteSourcePath = join(process.cwd(), filePath);
    const absoluteDestPath = join(process.cwd(), destination, basename(filePath)); 

    const sourceStream = createReadStream(absoluteSourcePath);
    const destStream = createWriteStream(absoluteDestPath);

    sourceStream.pipe(destStream);

    sourceStream.on("end", () => console.log(`File "${filePath}" copied to "${destination}"!`));
    sourceStream.on("error", () => console.error("Error copying"));
  } catch (error) {
    console.error("Error:", error.message);
  }
};


export const renameFile = async (filePath, newFilename) => {
  try {
    const absoluteSourcePath = resolve(process.cwd(), filePath);
    const absoluteNewPath = resolve(process.cwd(), newFilename);

    await rename(absoluteSourcePath, absoluteNewPath);
    console.log(`File "${filePath}" renamed to "${newFilename}"!`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};