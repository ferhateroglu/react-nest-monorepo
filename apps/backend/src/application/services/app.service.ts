import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { join } from "path";

@Injectable()
export class AppService {
  getApp(): string {
    try {
      // Assuming the frontend build is in the 'dist' folder of the frontend app
      const indexPath = join(__dirname, "..", "..", "..", "..", "frontend", "dist", "index.html");
      return readFileSync(indexPath, "utf8");
    } catch (error) {
      console.error("Error reading index.html:", error);
      return "Error loading the application";
    }
  }

  getAsset(filename: string): Buffer | null {
    try {
      const assetPath = join(__dirname, "..", "..", "..", "..", "frontend", "dist", "assets", filename);
      return readFileSync(assetPath);
    } catch (error) {
      console.error(`Error reading asset ${filename}:`, error);
      return null;
    }
  }
}
