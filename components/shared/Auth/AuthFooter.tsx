import Link from 'next/link';
type AuthFooterProps = {
	text: string;
	link: string;
	linkText: string;
};

const AuthFooter: React.FC<AuthFooterProps> = ({ text, link, linkText }) => {
	return (
		<div className="auth-form__footer">
			<p className="text-base-3">
				{text}{' '}
				<Link href={link} className="text-link">
					{linkText}
				</Link>
			</p>
		</div>
	);
};

export default AuthFooter;
