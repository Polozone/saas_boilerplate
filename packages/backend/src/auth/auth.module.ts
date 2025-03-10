import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MagicLogin } from './magic-login.strategy';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60m' },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, MagicLogin, EmailService, UserService],
  exports:[AuthService], // Rend AuthService accessible à d'autres modules
})
export class AuthModule {}
