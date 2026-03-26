import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConsoleLogger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
    })
  });
  const config = new DocumentBuilder()
      .setTitle('API Sistema Balneario')
      .setDescription('Documentación detallada de los endpoints del sistema')
      .setVersion('1.0')
      .addTag('Endpoints')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
