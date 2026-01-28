import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('EcoGom API')
    .setDescription('Hệ thống API backend cho dự án EcoGom')
    .setVersion('1.0')
    .addTag('Wastes', 'Quản lý danh mục rác')
    .addTag('Schedules', 'Quản lý lịch thu gom')
    .addTag('Locations', 'Quản lý điểm thu gom')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();