// src/application/application.module.ts

import { Module } from "@nestjs/common";
import { AppService } from "./services/app.service";
import { AssetService } from "./services/asset.service";
import { ChatbotService } from "./services/chatbot.service";
import { MongoDbSessionRepository } from "@infrastructure/repositories/mongodb-session.repository";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";

@Module({
  imports: [InfrastructureModule],
  providers: [AppService, AssetService, ChatbotService],
  exports: [AppService, AssetService, ChatbotService],
})
export class ApplicationModule {}
