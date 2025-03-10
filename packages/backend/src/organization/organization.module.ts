import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    })],
  controllers: [OrganizationController],
  providers: [OrganizationService, PrismaService, JwtService, EmailService],
  exports:[],
})
export class OrganizationModule {}
