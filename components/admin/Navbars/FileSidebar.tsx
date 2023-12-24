'use client';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetClose,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { HiMiniBars3 } from 'react-icons/hi2';
type FileSidebarProps = {
	fileId: string | null;
};

const FileSidebar: React.FC<FileSidebarProps> = ({ fileId }) => {
	const [show, setShow] = useState(fileId ? true : false);

	return (
		<Sheet open={show}>
			<SheetTrigger asChild>
				<Button className="text-[28px] text-primary-black-dark dark:text-primary-black-dark">
					<HiMiniBars3 />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="bg-white data-[state=open]:bg-secondary border-l border-l-primary-dark-100 xm:w-[350px] w-[260px] dark:border-opacity-10 border-opacity-10"
			>
				<div className="flex items-start">
					<SheetClose asChild>ssss{/* <TextLogo /> */}</SheetClose>
				</div>
				<ul className="flex flex-col gap-[20px] h-full pt-[50px] pb-[60px]">
					{/* <MobileMenuLink />
					<li className="mt-auto">
						<SheetClose asChild>
							<Link href="/sign-in" className="btn-primary">
								Sign in
							</Link>
						</SheetClose>
					</li> */}
					Details value
				</ul>
			</SheetContent>
		</Sheet>
	);
};

export default FileSidebar;
