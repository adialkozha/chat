import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configPattern } from '@config/index'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const confService = app.get(ConfigService)
  const port = confService.get<number>('PORT')
  await app.listen(port || 3000);
}
bootstrap();
