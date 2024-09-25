import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType, RequestMethod } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Set global prefix for all routes except the root
  app.setGlobalPrefix("api", {
    exclude: [
      { path: "/", method: RequestMethod.GET },
      { path: "/assets/(.*)", method: RequestMethod.GET },
    ],
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get("PORT");
  await app.listen(PORT);
}

bootstrap();
