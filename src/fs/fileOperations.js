import { createReadStream } from "fs";
import { unlink } from "fs/promises";

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