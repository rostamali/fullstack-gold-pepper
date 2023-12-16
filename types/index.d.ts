// AUTH types
interface RegisterUser {
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
}
interface ITokenOptions {
	expires: Date;
	maxAge: number;
	httpOnly: boolean;
	sameSite: 'lax' | 'strict' | 'none' | undefined;
	secure?: boolean;
}
