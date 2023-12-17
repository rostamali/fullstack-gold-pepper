import Link from 'next/link';
import Navlink from './Navlink';

const Header = () => {
	return (
		<header id="header" className="py-[20px] bg-dark__200-light__white">
			<div className="container">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="inline-block font-spaceGrotesk font-bold text-[26px] text-primary-black-dark dark:text-white"
					>
						Gold{' '}
						<span className="text-primary-orange-dark">
							& Pepper
						</span>
					</Link>
					<Navlink />
				</div>
			</div>
		</header>
	);
};

export default Header;
