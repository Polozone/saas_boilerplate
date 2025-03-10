import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import Strategy from 'passport-magic-login';
import { EmailService } from "../email/email.service";
import { AuthService } from "./auth.service"; // Adapter le chemin
import { EMAIL_PROVIDER } from "src/email/constants";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class MagicLogin extends PassportStrategy(Strategy) {
    constructor(
        @Inject(forwardRef(() => EmailService)) private readonly emailService: EmailService,
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    ) {
        super({
            secret: process.env.JWT_SECRET,
            jwtOptions: {
                expiresIn: process.env.MAGIC_LINK_TOKEN_DURATION
            },
            callbackUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/magiclink/callback`,
            sendMagicLink: async (destination: string, href: string) => {
                await MagicLogin.sendEmail(this.emailService, destination, href);
            },
            verify: async (payload, callback) => {
                await MagicLogin.verifyUser(this.authService, payload.destination, callback);
            }
        });
    }

    private static async sendEmail(emailService: EmailService, destination: string, href: string) {
        await emailService.sendEmail({
            sendTo: destination,
            html: `<p>Click <a href="${href}">here</a> to log in.</p>`,
            object: 'signin from magic link',
        });
    }

    private static async verifyUser(authService: AuthService, email: string, callback: (err: any, user?: any) => void) {
        try {
            const user = await authService.getOrCreateUserWithEmail({email});
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    }
}

