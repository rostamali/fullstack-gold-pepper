const sendProductionError = (error: Error) => {
	return {
		message: 'Invalid token secret',
	};
};
const sendDevelopmentError = (error: Error) => {
	return {
		target: 'Development Error',
		error,
	};
};

function CatchAsync(fn: any) {
	return async function (...arg: any) {
		try {
			return await fn(...arg);
		} catch (error) {
			if (error instanceof Error && error.name === 'JWTExpired') {
				// throw new Error('JWT token expired');
				return;
			}

			if (
				error instanceof Error &&
				error.name === 'JWSSignatureVerificationFailed'
			) {
				return;
				// throw new Error('JWT token secret is invalid');
			}

			return {
				CatchError: error,
			};
		}
	};
}

export default CatchAsync;
