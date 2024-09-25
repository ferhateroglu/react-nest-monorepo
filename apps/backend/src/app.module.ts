import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Controllers
import { AppController } from "@presentation/controllers/app.controller";
import { ChatbotController } from "@presentation/controllers/chatbot.controller";

// Services
import { AppService } from "@application/services/app.service";
import { AssetService } from "@application/services/asset.service";
import { ChatbotService } from "@application/services/chatbot.service";

// Modules
import { DatabaseModule } from "./infrastructure/database/database.module";

// Repositories
import { MongoDbSessionRepository } from "./infrastructure/repositories/mongodb-session.repository";

import { PresentationModule } from "@presentation/presentation.module";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    InfrastructureModule,
    ApplicationModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
