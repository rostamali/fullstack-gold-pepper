'use client';
import { SheetClose } from '@/components/ui/sheet';
import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileMenuLink = () => {
	const pathname = usePathname();

	return (
		<>
			{headerLinks.map((link, index) => (
				<li key={index}>
					<SheetClose asChild>
						<Link
							href={link.url}
							className={`nav-link w-full border rounded-md block py-[8px] px-[20px] ${
								pathname === link.url
									? 'bg-white bg-opacity-[0.01] border-primary-dark-100 font-medium'
									: 'bg-transparent border-transparent !font-normal'
							}
                  `}
						>
							{link.label}
						</Link>
					</SheetClose>
				</li>
			))}
		</>
	);
};

export default MobileMenuLink;
