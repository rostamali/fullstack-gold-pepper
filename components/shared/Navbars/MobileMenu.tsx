import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import TextLogo from '@/components/ui/textlogo';
import { HiMiniBars3 } from 'react-icons/hi2';
import MobileMenuLink from './MobileMenuLink';
import Link from 'next/link';

const MobileMenu = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="text-[28px] text-primary-black-dark dark:text-white lg:hidden block p-0">
					<HiMiniBars3 />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="bg-dark__200-light__white data-[state=open]:bg-secondary border-r border-r-primary-dark-100 xm:w-[280px] w-[260px] dark:border-opacity-100 border-opacity-10"
			>
				<div className="flex items-start">
					<SheetClose asChild>
						<TextLogo />
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

export default MobileMenu;
