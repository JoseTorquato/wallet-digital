import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/User';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';

@Module({
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [UserService],
})
export class UserModule {}
