// src/presentation/controllers/app.controller.ts

import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { AssetService } from "@application/services/asset.service";

@Controller()
export class AppController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  getApp(@Res() res: Response): void {
    const htmlContent = this.assetService.getHtmlContent();
    res.type("text/html").send(htmlContent);
  }

  @Get("/assets/:filename")
  getAsset(@Param("filename") filename: string, @Res() res: Response): void {
    const asset = this.assetService.getAsset(filename);
    if (asset) {
      const ext = filename.split(".").pop().toLowerCase();
      const contentType = this.assetService.getContentType(ext);
      res.contentType(contentType);
      res.send(asset);
    } else {
      res.status(404).send("Asset not found");
    }
  }
}
