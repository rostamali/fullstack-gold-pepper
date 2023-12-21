'use client';
import { updateAccessToken } from '@/lib/actions/auth.action';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
type NavlinkProps = {
	url: string;
	label: string;
};

const Navlink: React.FC<NavlinkProps> = ({ url, label }) => {
	const pathname = usePathname();
	const handleUser = async () => {
		return await updateAccessToken();
	};
	useEffect(() => {
		handleUser();
	}, []);

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
