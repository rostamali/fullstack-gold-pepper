import Link from 'next/link';
type AuthHeaderProps = {
	title: string;
	subtitle: string;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
	return (
		<div className="auth-form__header">
			<Link
				href="/"
				className="mb-[15px] inline-block font-spaceGrotesk font-bold text-[18px]"
			>
				Gold <span className="text-primary-orange-dark">& Pepper</span>
			</Link>
			<h1 className="heading-3 !text-primary-black-dark">{title}</h1>
			<p className="text-base-3">{subtitle}</p>
		</div>
	);
};

export default AuthHeader;
