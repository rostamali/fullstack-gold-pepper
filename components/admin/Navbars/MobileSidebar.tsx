import MobileMenuLink from '@/components/shared/Navbars/MobileMenuLink';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import TextLogo from '@/components/ui/textlogo';
import Link from 'next/link';
import React from 'react';
import { HiMiniBars3 } from 'react-icons/hi2';

const MobileSidebar = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="text-[28px] text-primary-black-dark block p-0 sm:hidden">
					<HiMiniBars3 />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="xm:w-[280px] bg-white">
				<div className="flex items-start">
					<SheetClose asChild>
						<Link
							href="/"
							className="inline-block font-spaceGrotesk font-bold text-[25px]"
						>
							Gold{' '}
							<span className="text-primary-orange-dark">
								& Pepper
							</span>
						</Link>
					</SheetClose>
				</div>
				<ul className="flex flex-col gap-[20px] h-full pt-[50px] pb-[60px]">
					<MobileMenuLink />
					<li className="mt-auto">
						<SheetClose asChild>
							<Link href="/sign-in" className="btn-primary">
								Sign in
							</Link>
						</SheetClose>
					</li>
				</ul>
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
