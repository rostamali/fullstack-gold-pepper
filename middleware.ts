import { NextRequest, NextResponse } from 'next/server';
// import { verifyAuth } from './lib/auth';

export async function middleware(req: NextRequest) {
	// const token = req.cookies.get('auth_token')?.value;
	// const verifiedToken = token && (await verifyAuth(token));

	// if (req.nextUrl.pathname.startsWith('/signin')) {
	// 	return;
	// }
	// if (req.nextUrl.pathname.startsWith('/dashboard') && !verifiedToken) {
	// 	return NextResponse.redirect(
	// 		new URL(`/signin?redirect=${req.nextUrl.pathname}`, req.url),
	// 	);
	// }
	return;
}

export const config = {
	matcher: [
		'/dashboard',
		'/dashboard/profile',
		'/dashboard/users',
		'/dashboard/users/register',
		'/signin',
		'/sign-up/verify-email',
	],
};
