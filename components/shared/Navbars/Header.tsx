import Link from 'next/link';
import Navlink from './Navlink';
import { authProfile } from '@/lib/actions/auth.action';
import Theme from './Theme';
import { headerLinks } from '@/constants';
import MobileMenu from './MobileMenu';

const Header = async () => {
	const data = await authProfile();

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
					{/* <Navlink /> */}
					<div className="flex items-center gap-[10px] flex-1 justify-end">
						<ul className="lg:flex items-center gap-[25px] hidden">
							{headerLinks.map((link, index) => (
								<Navlink
									key={index}
									url={link.url}
									label={link.label}
								/>
							))}
						</ul>
						<Theme />
						{data ? (
							<Link href="/sign-in" className="btn-primary">
								My Account
							</Link>
						) : (
							<div className="lg:block hidden">
								<Link href="/sign-in" className="btn-primary">
									Sign in
								</Link>
							</div>
						)}
						<MobileMenu />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
