import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
