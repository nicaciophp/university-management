import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityController } from './controllers/university.controller';
import { UniversityRepository } from './repositories/implementations/university.repository';
import { UniversitySchema } from './schemas/university.schema';
import { UniversityService } from './services/university.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'University', schema: UniversitySchema}
    ])
  ],
  controllers: [UniversityController],
  providers: [UniversityService, UniversityRepository]
})
export class UniversityModule {}
