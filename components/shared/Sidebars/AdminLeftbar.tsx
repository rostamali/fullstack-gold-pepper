'use client';
import { adminHeaderLinks } from '@/constants';
import AdminNavlink from '../Navlink/AdminNavlink';

const AdminLeftbar = () => {
	return (
		<div className="left-sidebar flex flex-col gap-[15px] w-full">
			{adminHeaderLinks.map((nav, index) => (
				<AdminNavlink
					key={index}
					nav={nav}
					linkClass={''}
					linkActiveClass={''}
					textClass={''}
				/>
			))}
		</div>
	);
};

export default AdminLeftbar;
