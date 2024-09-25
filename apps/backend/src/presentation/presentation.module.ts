// src/presentation/presentation.module.ts

import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { ChatbotController } from "./controllers/chatbot.controller";

import { ApplicationModule } from "@application/application.module";

@Module({
  imports: [ApplicationModule],
  controllers: [AppController, ChatbotController],
})
export class PresentationModule {}
