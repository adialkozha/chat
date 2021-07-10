import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule,TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configPattern, configValidation } from './config';
import orm from './orm'
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configPattern],
      validationSchema: configValidation,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(orm),
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
