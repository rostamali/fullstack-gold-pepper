import { adminHeaderLinks } from '@/constants';
import Link from 'next/link';

const LeftSidebar = () => {
	return (
		<div className="left-sidebar flex flex-col gap-[15px]">
			{adminHeaderLinks.map((nav, index) => (
				<Link
					href={nav.link}
					className="flex items-center gap-[10px]"
					key={index}
				>
					<nav.icon className="text-[22px]" />
					<span>{nav.label}</span>
				</Link>
			))}
		</div>
	);
};

export default LeftSidebar;
