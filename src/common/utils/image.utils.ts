import * as fs from "fs";
import path from "path";
import crypto from "crypto";

export interface Utils {
  save: (base64: string) => Promise<string>;
}

export class ImageUtils implements Utils {
  save = async (base64: string): Promise<string> => {
    try {
      const storagePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "tmp",
        "uploads"
      );
      const randomBytes = await crypto.randomBytes(16);
      const fileName = `${randomBytes.toString("hex")}.png`;
      const filePath = path.join(storagePath, fileName);
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      fs.writeFileSync(filePath, buffer);

      return `http://localhost:80/img/${fileName}`;
    } catch (e) {
      throw e;
    }
  };
}
