import { MiddlewareConsumer, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users';
import { AuthModule } from './auth';
import { AuthenticationMiddleware } from 'src/middlewares/authentication';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:LV6UtQ77XN2ZBmrv@wallet.kbjtlot.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
  ],
})
export class MainModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('user/response');
  }
}
