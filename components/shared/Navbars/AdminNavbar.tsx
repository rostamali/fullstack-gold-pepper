'use client';
import Link from 'next/link';
import LeftNavbar from '../Sidebars/LeftNavbar';
import { Button } from '@/components/ui/button';
import { HiMiniBars3 } from 'react-icons/hi2';
import { adminHeaderLinks } from '@/constants';
import AdminNavlink from '../Navlink/AdminNavlink';

const AdminNavbar = () => {
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
				<LeftNavbar
					content={
						<div className="">
							<Link
								href="/"
								className="inline-block font-spaceGrotesk font-bold text-[25px]"
							>
								Gold{' '}
								<span className="text-primary-orange-dark">
									& Pepper
								</span>
							</Link>
							<div className="flex flex-col gap-[15px] mt-[30px]">
								{adminHeaderLinks.map((nav, index) => (
									<AdminNavlink
										key={index}
										nav={nav}
										linkClass={''}
										linkActiveClass={''}
										textClass={'!block'}
									/>
								))}
							</div>
						</div>
					}
					contentClass={'xm:w-[280px] bg-white'}
					trigger={
						<Button className="text-[28px] text-primary-black-dark block p-0 sm:hidden">
							<HiMiniBars3 />
						</Button>
					}
				/>
			</div>
		</header>
	);
};

export default AdminNavbar;
