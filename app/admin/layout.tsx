import Header from '@/components/admin/Navbars/Header';
import LeftSidebar from '@/components/admin/Navbars/LeftSidebar';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-admin-gray-thin relative">
			<Header />
			<div className="flex">
				<section className="bg-white sticky left-0 top-0 flex h-screen w-fit overflow-y-auto border-r border-r-admin-gray-dark border-opacity-40 p-6 pt-36 shadow-light-300 lg:w-[266px] max-sm:hidden">
					<LeftSidebar />
				</section>
				<section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
					<div className="mx-auto w-full max-w-5xl">{children}</div>
				</section>
			</div>
		</div>
	);
}
