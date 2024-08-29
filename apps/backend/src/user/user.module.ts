import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      secretOrPrivateKey: process.env.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
