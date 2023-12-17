import { headerLinks } from '@/constants';
import Link from 'next/link';
import Theme from './Theme';
import MobileMenu from './MobileMenu';
import { authProfile } from '@/lib/actions/auth.action';

const Navlink = async () => {
	const data = await authProfile();
	console.log(data);

	return (
		<div className="flex items-center gap-[10px] flex-1 justify-end">
			<ul className="lg:flex items-center gap-[25px] hidden">
				{headerLinks.map((link, index) => (
					<li key={index}>
						<Link href={link.url} className="nav-link">
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<Theme />
			{data?.success ? (
				<h2>{data?.user?.firstName}</h2>
			) : (
				<div className="lg:block hidden">
					<Link href="/sign-in" className="btn-primary">
						Sign in
					</Link>
				</div>
			)}
			<MobileMenu />
		</div>
	);
};

export default Navlink;
