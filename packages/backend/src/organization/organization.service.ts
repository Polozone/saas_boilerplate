import { Injectable } from '@nestjs/common';
import { Organization, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { SendEmailDto } from 'src/email/dto/send-email.dto';
import { Role } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { UpdateOrganizationInput } from '@monorepo/api-types';

@Injectable()
export class OrganizationService {

	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private emailService: EmailService,
	) { }

	async update(where: Prisma.OrganizationWhereUniqueInput, data: UpdateOrganizationInput) {
		// Récupérer tous les utilisateurs en une seule requête
		const users = await this.prisma.user.findMany({
			where: {
				email: {
					in: data.users?.map(u => u.email) || []
				}
			}
		});

		// Créer un map pour un accès rapide
		const userMap = new Map(users.map(u => [u.email, u]));

		const organization = await this.prisma.organization.update({
			where,
			data: {
				name: data.name,
				users: {
					update: data.users
						?.filter(u => u.operation === "update")
						.map(u => ({
							where: {
								userId_organizationId: {
									userId: userMap.get(u.email).id,
									organizationId: where.id
								}
							},
							data: { role: u.data?.role }
						})),
					delete: data.users
						?.filter(u => u.operation === "disconnect") 
						.map(u => ({
							userId_organizationId: {
								userId: userMap.get(u.email).id,
								organizationId: where.id
							}
						}))
				}
			},
			include: {
				users: {
					include: {
						user: {
							select: {
								id: true,
								email: true,
								name: true
							}
						}
					}
				}
			}
		});

		return {
			status: 200 as const,
			body: {
				...organization,
				users: organization.users.map(({ user, role, organizationId }) => ({
					...user,
					role,
					organizationId
				}))
			}
		};
	}

	async get(id: string) {
		const organization = await this.prisma.organization.findUnique({
			where: { id },
			include: {
				users: {
					include: {
						user: true
					}
				}
			}
		});

		if (!organization) {
			return {
				status: 404 as const,
				body: { message: "Organization not found" }
			};
		}

		return {
			status: 200 as const,
			body: {
				...organization,
				users: organization.users.map(u => ({
					id: u.user.id,
					email: u.user.email,
					name: u.user.name,
					role: u.role,
					organizationId: u.organizationId
				}))
			}
		};
	}

	// async getOrCreateOrganization(user: User): Promise<Organization> {
	// 	const organization = await this.prisma.organization.upsert({
	// 		where: {
	// 			ownerId: user.id
	// 		}, update: {},
	// 		create: {
	// 			ownerId: user.id,
	// 			users: {
	// 				connect: { id: user.id }
	// 			},
	// 		},
	// 		include: { users: true }
	// 	})
	// 	if (organization) {
	// 		await this.prisma.userOrganization.update({
	// 			where: {
	// 				userId_organizationId: {
	// 					userId: user.id,
	// 					organizationId: organization.id
	// 				}
	// 			}, data: {
	// 				role: Role.Owner
	// 			}
	// 		})
	// 	}
	// 	return organization;
	// }

	async invite(inviter: User, body) {
		const payload = {
		  destination: body.email,
		  organizationId: body.organizationId
		};
	  
		const token = await this.jwtService.signAsync(payload, { 
		  expiresIn: process.env.MAGIC_LINK_TOKEN_DURATION, 
		  secret: process.env.JWT_SECRET 
		});
		
		const href = `${process.env.FRONTEND_URL || "http://localhost:3000"}` + "/auth/joinorganization/callback?token=" + token;
		
		const email: SendEmailDto = {
		  sendTo: body.email,
		  html: `<p>${inviter.email} invited you to their organization. Click <a href="${href}">here</a> to join.</p>`,
		  object: "You've been invited to join an organization",
		};  
	  
		await this.emailService.sendEmail(email);
	  
		return { status: 200 as const, body: { message: body.email + "successfully invited" } };
	  }
	  
}
