import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { MongoDbSessionRepository } from "./repositories/mongodb-session.repository";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: "ISessionRepository",
      useClass: MongoDbSessionRepository,
    },
  ],
  exports: ["ISessionRepository"],
})
export class InfrastructureModule {}
