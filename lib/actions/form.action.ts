'use server';
import { prisma } from '../prisma';
import { handleResponse } from '../helper/serverResponse';
import sendMail from '../helper/sendMail';

export const submitContactForm = async (params: {
	name: string;
	email: string;
	message: string;
	acceptTerms: boolean;
}) => {
	try {
		const { name, email, message, acceptTerms } = params;
		const newSubmit = await prisma.form.create({
			data: {
				name,
				email,
				message,
				acceptTerms,
			},
		});
		await sendMail({
			email,
			subject: 'New Form Submission',
			template: `<h1>Verify Code: ${JSON.stringify(newSubmit)}</h1>`,
		});
		return handleResponse(true, 'Message sent successfully!');
	} catch (error) {
		return handleResponse(false, 'Oops! Something went wrong');
	}
};
export const subscribeForm = async (params: { email: string }) => {
	try {
		const { email } = params;
		const userExist = await prisma.subscriber.findUnique({
			where: { email },
		});
		if (userExist) return handleResponse(false, 'Email already exists');
		const newSubmit = await prisma.subscriber.create({
			data: {
				email,
				status: 'SUBSCRIBE',
			},
		});
		await sendMail({
			email,
			subject: 'Thank you for subscribing us',
			template: `<h1>Verify Code: ${JSON.stringify(newSubmit)}</h1>`,
		});
		return handleResponse(true, 'Subscribe successfully done');
	} catch (error) {
		return handleResponse(false, 'Oops! Something went wrong');
	}
};
