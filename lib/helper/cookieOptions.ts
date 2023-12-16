const verifyTokenExpiresIn = 5 * 60 * 1000;
export const verifyEmailTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + verifyTokenExpiresIn),
	maxAge: verifyTokenExpiresIn,
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production' && true,
};
