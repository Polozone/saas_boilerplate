import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // We have two logic of authentification
        ExtractJwt.fromAuthHeaderAsBearerToken(), // 1. From Authorization Bearer
        (request:Request) => {                    // 2. From cookies httpOnly
          let data = request?.cookies["access_token"];
          if(!data){
              return null;
          }
          return data
      }
      ]),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    // delete user.password;
    return user;
  }
}