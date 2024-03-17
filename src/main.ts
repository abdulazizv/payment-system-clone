import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 7777;
  const config = new DocumentBuilder()
    .setTitle("Payment System Clone")
    .setExternalDoc("Postman link", `https://localhost:${port}/docs-json`)
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: "none",
    },
  });

  // app.setGlobalPrefix("api");

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   prefix: "v",
  //   defaultVersion: "1",
  // });


  await app.listen(port);
}
bootstrap();
