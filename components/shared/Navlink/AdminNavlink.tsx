'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

type AdminNavlinkProps = {
	nav: {
		url: string;
		label: string;
		icon: IconType;
	};
	linkClass: string;
	linkActiveClass: string;
	textClass: string;
};

const AdminNavlink: React.FC<AdminNavlinkProps> = ({
	nav,
	linkClass,
	linkActiveClass,
	textClass,
}) => {
	const pathname = usePathname();
	return (
		<Link
			href={nav?.url}
			className={`flex items-center gap-[10px] rounded-md p-[12px] ${linkClass} ${
				pathname === nav?.url
					? `primary-gradient text-white font-semibold ${linkActiveClass}`
					: 'text-primary-black-light font-medium'
			}`}
		>
			<nav.icon className="text-[22px]" />
			<span className={`text-[17px] max-lg:hidden ${textClass}`}>
				{nav.label}
			</span>
		</Link>
	);
};

export default AdminNavlink;
