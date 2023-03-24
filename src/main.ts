import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  console.log(join(__dirname, "../../public"));
  app.useStaticAssets(join(__dirname, "../../", "public"), {
    prefix: "/public/",
  });

  app.enableVersioning();

  const config = new DocumentBuilder()
    .setTitle("Nestjs init")
    .setDescription("API document")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || 3000);

  const appUrl = await app.getUrl();
  console.log("Application is running on:", appUrl);
  console.log("Swagger:", `${appUrl}/api`);
}
bootstrap();
