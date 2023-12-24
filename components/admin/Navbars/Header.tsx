import Link from 'next/link';

const Header = () => {
	return (
		<header className="p-6 sm:px-12 shadow-light-100 bg-white fixed top-0 left-0 right-0 z-[1]">
			<Link
				href="/"
				className="mb-[15px] inline-block font-spaceGrotesk font-bold text-[25px]"
			>
				Gold <span className="text-primary-orange-dark">& Pepper</span>
			</Link>
		</header>
	);
};

export default Header;
