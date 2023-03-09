import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/implementations/user.repository';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema}
    ])
  ]
})
export class UsersModule {}
