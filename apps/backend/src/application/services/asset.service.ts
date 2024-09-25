// src/application/services/asset.service.ts

import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { join } from "path";

@Injectable()
export class AssetService {
  getHtmlContent(): string {
    try {
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

  getContentType(ext: string): string {
    const contentTypes = {
      js: "application/javascript",
      css: "text/css",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      svg: "image/svg+xml",
    };
    return contentTypes[ext] || "application/octet-stream";
  }
}
