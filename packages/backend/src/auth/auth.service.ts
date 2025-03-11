import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { PayloadDto } from './dto/payload.dto';
import { MagicLogin } from './magic-login.strategy';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,
        private jwtService: JwtService,
        private userService: UserService,
        private magicLogin: MagicLogin
    ) { }

    async verifyRefreshToken(refreshToken: string, accessToken: string, res){
        let verifyRefreshToken;
        try {
            verifyRefreshToken = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
        } catch (e){
            throw new UnauthorizedException("Invalid or missing refresh_token");
        }
        if (verifyRefreshToken){
            try {
                const verifyAccessToken = await this.jwtService.verifyAsync(accessToken, { secret: process.env.JWT_SECRET });
            } catch (e){
                const access_token = await this.generateAccessToken({
                    sub: verifyRefreshToken.sub,
                    email: verifyRefreshToken.email,
                });
                res.cookie('access_token', access_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                });
            }
        }
        res.send();
    }

    async sendMagicLink(req, res){
        try {
            this.magicLogin.send(req, res);
            return {
                status: 200,
                body: {
                    message: "Magic link successfuly sent"
                }
            }
        } catch (e){
            return {
                status: 400,
                body: {
                    message: "Error sending magic link"
                }
            }
        }
    }

    async signup(body) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (user) {
            throw new ConflictException("Email is already registered");
        }

        await this.prisma.user.create({
            data: {
                email: body.email,
            }
        })
    }

    async signin(authDto: AuthDto, res) {
        const user = await this.userService.getUserWithEmailOrThrow(authDto.email);

        const payload = { sub: user.id, email: user.email };

        const access_token = await this.generateAccessToken(payload);

        res.cookie('access_token', access_token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		});

        const refresh_token = await this.generateRefreshToken(payload);

        res.cookie('refresh_token', refresh_token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		});
		return res.json({ success: true, message: "User signed in successfully" });
    }

    async getOrCreateUserWithEmail(authDto: AuthDto): Promise<User> {
        const user = await this.prisma.user.upsert({
            where: {
                email: authDto.email
            }, update: {},
            create: {
                email: authDto.email,
            }
        })
        console.log("user created:", user);
        return user;
    }

    async signupInvitedUserAndJoinOrganization(token: string, res) {
        const decodedPayload = await this.jwtService.decode(token);

        if (!decodedPayload) {
            throw new UnauthorizedException();
        }

        const authDto: AuthDto = {
            email: decodedPayload.destination,
        }

        console.log("➕>>user has been invited to join organization: ", decodedPayload.destination);

        const isUserIsAlreadyInOrganization = await this.prisma.user.findUnique({
            where: {
                email: decodedPayload.destination
            }
        })

        const user = await this.getOrCreateUserWithEmail(authDto);
        
        if (!isUserIsAlreadyInOrganization) {
            await this.prisma.userOrganization.create({
                data: {
                    userId: user.id,
                    organizationId: decodedPayload.organizationId,
                }
            });
        }

        await this.setTokensInCookies(res, {
            sub: user.id,
            email: user.email
        });

        return {
            status: 201 as const,
            body: {
                message: "User successfully invited"
            }
        }
    }
    
    async generateAccessToken(payload: { sub: string, email: string }) {
        console.log("access_token_duration:", process.env.ACCESS_TOKEN_DURATION);
        return this.jwtService.signAsync(payload, { 
            expiresIn: process.env.ACCESS_TOKEN_DURATION,
            secret: process.env.JWT_SECRET 
        });
    }

    async generateRefreshToken(payload: { sub: string, email: string }) {
        console.log("refresh_token_duration:", process.env.REFRESH_TOKEN_DURATION);
        return this.jwtService.signAsync(payload, { 
            expiresIn: process.env.REFRESH_TOKEN_DURATION,
            secret: process.env.JWT_REFRESH_SECRET 
        });
    }

    async setTokensInCookies(res, payload: PayloadDto){
        console.log("🛜>>incoming connection: ", payload.email);
        const access_token = await this.generateAccessToken({
			sub: payload.sub,
			email: payload.email
		});
		const refresh_token = await this.generateRefreshToken({
			sub: payload.sub,
			email: payload.email
		});
		res.cookie('access_token', access_token, {
			httpOnly: true,    // Empêche l'accès au token par JavaScript
			secure: true,      // Nécessite HTTPS (à désactiver en local)
			sameSite: 'strict' // Empêche l'envoi cross-site (sécurise contre CSRF)
		});
		res.cookie('refresh_token', refresh_token, {
			httpOnly: true,    // Empêche l'accès au token par JavaScript
			secure: true,      // Nécessite HTTPS (à désactiver en local)
			sameSite: 'strict' // Empêche l'envoi cross-site (sécurise contre CSRF)
		});
    }

}