import Link from 'next/link';
import MobileSidebar from './MobileSidebar';

const Header = () => {
	return (
		<header className="p-6 sm:px-12 shadow-light-100 bg-white fixed top-0 left-0 right-0 z-[1] flex items-center justify-between">
			<Link
				href="/"
				className="inline-block font-spaceGrotesk font-bold text-[25px]"
			>
				Gold <span className="text-primary-orange-dark">& Pepper</span>
			</Link>
			<div className="relative w-full max-w-[600px] max-lg:hidden">
				Global Search
			</div>
			<div className="profile">
				<MobileSidebar />
			</div>
		</header>
	);
};

export default Header;
