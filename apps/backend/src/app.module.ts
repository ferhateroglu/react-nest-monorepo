import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatbotController } from "./presentation/controllers/chatbot.controller";
import { ChatbotService } from "./application/services/chatbot.service";
import { MongoDbSessionRepository } from "./infrastructure/repositories/mongodb-session.repository";
import { Session, SessionSchema } from "./infrastructure/database/schemas/session.schema";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `.env.${process.env.NODE_ENV} || .dev`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.uri"),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [ChatbotController],
  providers: [
    ChatbotService,
    {
      provide: "ISessionRepository",
      useClass: MongoDbSessionRepository,
    },
  ],
})
export class AppModule {}
