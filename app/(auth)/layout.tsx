export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="font-inter bg-cover bg-center auth-light-bg dark:auth-dark-bg">
			{children}
		</div>
	);
}
