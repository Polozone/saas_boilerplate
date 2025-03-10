import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { UserService } from './user/user.service';
import { OrganizationService } from './organization/organization.service';
import { OrganizationModule } from './organization/organization.module';
import { MagicLogin } from './auth/magic-login.strategy';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    EmailModule,
    OrganizationModule,
    ProjectModule,
  ],
  providers: [
    AuthService, 
    PrismaService, 
    JwtService, 
    EmailService, 
    UserService, 
    OrganizationService,
    MagicLogin
  ],
})
export class AppModule {}
