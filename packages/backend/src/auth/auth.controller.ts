import { Controller, Get, Post, Body, UseGuards, Req, Res, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { authContract } from '@monorepo/api-types';

@Controller("auth")
export class AuthController {

	constructor(
		private authService: AuthService,
	) { }

	@Post("logout")
	@TsRestHandler(authContract.logout)
	@UseGuards(JwtAuthGuard)
	logout(@Res({passthrough:true}) res) {
		return tsRestHandler(authContract.logout, async () => {
			res.clearCookie('access_token');
			res.clearCookie('refresh_token');
			return { status: 201, body: { message: "Successfuly logout" }};
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	async getMe(@Req() req) {
		return req.user;
	}

	@Post('refreshtoken')
	async refreshToken(@Req() req, @Res() res) {
		return this.authService.verifyRefreshToken(
			req.cookies["refresh_token"],
			req.cookies["access_token"],
			res
		);
	}

	@Post("magiclogin")
	@TsRestHandler(authContract.signinMagicLink)
	async sendMagicLink(@Req() req, @Res() res) {
		return (authContract.signinMagicLink, async () => {
			return this.authService.sendMagicLink(req, res);
		})
	}

	@Post('magiclogin/joinorganization/callback')
	@TsRestHandler(authContract.callbackJoinOrganization)
	async joinOrganization(@Res({ passthrough: true }) res) {
		return (tsRestHandler(authContract.callbackJoinOrganization, async ({ body }) => {
			return this.authService.signupInvitedUserAndJoinOrganization(body.token, res);
		}))
	}

	@Post('magiclogin/callback')
	@UseGuards(AuthGuard('magiclogin'))
	@TsRestHandler(authContract.signinMagicLinkCallback)
	async magicLoginCallback(@Param('token') token: string, @Req() req, @Res({ passthrough: true }) res) {
		return (tsRestHandler(authContract.signinMagicLinkCallback, async () => {
			await this.authService.setTokensInCookies(res, {
				sub: req.user.id,
				email: req.user.email
			})
			return { status: 200, body: { message: "Successfuly login" }};
		}))
	}

	// Uncomment to let the user signup with email/password (or)
	// You can let the user signup via the magiclink route
	// @Post('signup')
	// async signup(@Body() body: { email: string, password: string }) {
	// 	return this.authService.signup(body);
	// }

	// @Post('signin')
	// async signin(
	// 	@Body() authDto: AuthDto,
	// 	@Res() res) {
	// 	return this.authService.signin(authDto, res);
	// }
}