'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type NavlinkProps = {
	url: string;
	label: string;
};

const Navlink: React.FC<NavlinkProps> = ({ url, label }) => {
	const pathname = usePathname();
	return (
		<li>
			<Link
				href={url}
				className={`nav-link ${
					pathname === url
						? '!text-primary-orange-dark dark:text-primary-orange-dark'
						: ''
				}`}
			>
				{label}
			</Link>
		</li>
	);
};

export default Navlink;
