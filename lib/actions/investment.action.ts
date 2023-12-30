'use server';

import { handleResponse } from '../helper/serverResponse';
import { isAuthenticatedAccess } from './auth.action';
import { prisma } from '../prisma';
import sendMail from '../helper/sendMail';

export const submitProjectInterested = async (params: {
	amount: number;
	phoneNumber: string;
	agreeTerm: boolean;
	projectId: string;
}) => {
	try {
		const isAuth = await isAuthenticatedAccess();
		if (!isAuth) return handleResponse(false, `You don't have permission`);
		const { amount, phoneNumber, agreeTerm, projectId } = params;
		const investor = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
			},
		});
		if (!investor)
			return handleResponse(false, `Invalid login information`);
		const projectExist = await prisma.project.findUnique({
			where: {
				id: projectId,
				status: 'ACTIVE',
			},
			select: {
				id: true,
				name: true,
				category: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!projectExist)
			return handleResponse(false, `Project does not exist`);

		const investmentExistOnUser = await prisma.investment.findFirst({
			where: {
				userId: isAuth.id,
				projectId: projectExist.id,
			},
			select: {
				id: true,
			},
		});
		if (investmentExistOnUser)
			return handleResponse(false, `We already received your intertest`);

		const newInvestment = await prisma.investment.create({
			data: {
				name: `${investor?.firstName} ${investor?.lastName}`,
				email: investor.email,
				phoneNumber: phoneNumber,
				agreeTerm,
				isActive: true,
				status: 'PENDING',
				amount: String(amount),
				project: {
					connect: {
						id: projectExist.id,
					},
				},
				projectName: projectExist.name,
				projectIndustry: projectExist.category
					? projectExist.category?.name
					: '',
				user: {
					connect: {
						id: investor.id,
					},
				},
			},
		});
		try {
			await sendMail({
				email: investor.email,
				subject: `New Investor on the ${projectExist.name}`,
				template: `<h1>Interest submitted done </h1>`,
			});
			return handleResponse(true, `Investment interest submitted`);
		} catch (error) {
			await prisma.investment.delete({
				where: {
					id: newInvestment.id,
				},
			});
			return handleResponse(
				false,
				`Investment interest submitted failed`,
			);
		}
	} catch (error) {
		return handleResponse(false, `Investment interest submitted failed`);
	}
};
