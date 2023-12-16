import sendMail from '../helper/sendMail';
import { prisma } from '../prisma';

export const registerUser = async (params: RegisterUser) => {
	try {
		const { firstName, lastName, email, password } = params as RegisterUser;
		// const { error } = registerUserValidate.validate({
		// 	name,
		// 	password,
		// 	email,
		// });
		// if (error) return next(error);
		// const userExist = await prisma.user.findUnique({
		// 	where: {
		// 		email,
		// 	},
		// });
		// if (userExist) return next(new AppError(ErrorMessage.userExist, 400));
		// const bcryptPass = await bcryptPassword(password);
		// const user: IUserRegister = {
		// 	name,
		// 	email,
		// 	password: bcryptPass,
		// };
		// const { token, code } = createActivationToken(user);
		// await sendMail({
		// 	email,
		// 	subject: 'Account activation email',
		// 	template: `<h1>${}</h1>`,
		// });
	} catch (error) {
		return { error };
	}
};
