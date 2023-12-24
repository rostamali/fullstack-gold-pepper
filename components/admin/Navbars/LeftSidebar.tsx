'use client';
import { adminHeaderLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftSidebar = () => {
	const pathname = usePathname();
	return (
		<div className="left-sidebar flex flex-col gap-[15px] w-full">
			{adminHeaderLinks.map((nav, index) => (
				<Link
					href={nav.link}
					className={`flex items-center gap-[10px] rounded-md p-[12px] ${
						pathname === nav.link
							? 'primary-gradient text-white font-semibold'
							: 'text-primary-black-light font-medium'
					}`}
					key={index}
				>
					<nav.icon className="text-[22px]" />
					<span className="text-[17px] max-lg:hidden">
						{nav.label}
					</span>
				</Link>
			))}
		</div>
	);
};

export default LeftSidebar;
