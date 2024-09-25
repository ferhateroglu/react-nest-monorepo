import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongoDbSessionRepository } from "./infrastructure/repositories/mongodb-session.repository";
import { DatabaseModule } from "./infrastructure/database/database.module";

// Controllers
import { AppController } from "@presentation/controllers/app.controller";
import { ChatbotController } from "@presentation/controllers/chatbot.controller";

// Services
import { AppService } from "@application/services/app.service";
import { AssetService } from "@application/services/asset.service";
import { ChatbotService } from "@application/services/chatbot.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
  ],
  controllers: [AppController, ChatbotController],
  providers: [
    AppService,
    AssetService,
    ChatbotService,
    {
      provide: "ISessionRepository",
      useClass: MongoDbSessionRepository,
    },
  ],
})
export class AppModule {}
