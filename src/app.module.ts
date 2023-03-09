import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UniversityModule } from './modules/university/university.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UniversityModule, 
    ScheduleModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
