'use client';
import { useState } from 'react';
import LocalSearch from '../Search/LocalSearch';
import SelectFilter from '../Search/SelectFilter';
import { InvestmentStatus } from '@/constants';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
	isChecked,
	isSelectAll,
	toggleSelectAll,
	toggleSelectList,
} from '@/lib/utils';
import { InvestmentStatusFormat, dateFormat } from '@/lib/helper/format';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { BsThreeDots } from 'react-icons/bs';
import Link from 'next/link';
import EmptyError from '../Cards/EmptyError';
type InvestmentProps = {
	data: InvestmentList[];
	pages: number;
};

const InvestmentList: React.FC<InvestmentProps> = ({ data }) => {
	const [isPending, setIsPending] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const handleDeleteSelectedFile = async () => {
		setIsPending(true);
		// try {
		// 	if (selectedItems) {
		// 		const result = await deleteProjectByAdmin({
		// 			projectId: selectedItems,
		// 		});
		// 		setIsPending(false);
		// 		if (result.success) {
		// 			toast.success(result.message);
		// 			setSelectedItems(null);
		// 		} else {
		// 			toast.error(result.message);
		// 		}
		// 	} else {
		// 		setIsPending(false);
		// 		toast.error('Empty selected category');
		// 	}
		// } catch (error: any) {
		// 	setIsPending(false);
		// 	toast.error(error.message);
		// }
	};

	return (
		<div className="investment-list">
			<div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[40px] gap-[20px] mb-[30px]">
				<div className="flex items-center md:justify-start justify-between gap-[20px]">
					<span className="text-base-2">
						{selectedItems && selectedItems.length > 0
							? selectedItems.length
							: 0}{' '}
						file selected
					</span>
					<Button
						className="btn-primary__ghost !h-[50px] !px-[20px]"
						disabled={isPending}
						onClick={handleDeleteSelectedFile}
					>
						Delete
					</Button>
				</div>
				<div className="grid grid-cols-5 gap-[20px]">
					<LocalSearch
						route={'/admin/investments'}
						iconPosition={'left'}
						placeholder={'Search by project...'}
						containerClass={
							'bg-white border border-admin-gray-dark border-opacity-70 col-span-3'
						}
						inputClass={'text-primary-black-light'}
						iconClass={'text-primary-black-light text-opacity-40'}
					/>
					<div className="col-span-2">
						<SelectFilter
							filterKey={'status'}
							placeholder={'Filter by status'}
							triggerClass={
								'bg-white border border-admin-gray-dark border-opacity-70 text-primary-black-light text-opacity-60 h-[52px]'
							}
							contentClass={'bg-white'}
							options={InvestmentStatus}
						/>
					</div>
				</div>
			</div>
			{data.length > 0 ? (
				<>
					<Table className="shadow-light-100">
						<TableHeader>
							<TableRow className="border-b border-admin-gray-light border-opacity-25">
								<TableHead className="table-header__bg-tl">
									<div className="flex items-center gap-[5px]">
										<Checkbox
											id="select-all"
											className="h-[18px] w-[18px] border-primary-dark-200 rounded"
											checked={isSelectAll<InvestmentList>(
												data,
												selectedItems,
											)}
											onClick={() =>
												toggleSelectAll<InvestmentList>(
													data,
													selectedItems,
													setSelectedItems,
												)
											}
										/>
										<label htmlFor="select-all">
											Investor
										</label>
									</div>
								</TableHead>
								<TableHead className="table-header__bg">
									Phone #
								</TableHead>
								<TableHead className="table-header__bg">
									Project
								</TableHead>
								<TableHead className="table-header__bg">
									Status
								</TableHead>
								<TableHead className="table-header__bg">
									Created At
								</TableHead>
								<TableHead className="table-header__bg-tr">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="bg-white">
							{data.map((investor, index: number) => (
								<TableRow key={index}>
									<TableCell>
										<div className="flex items-center gap-[8px]">
											<Checkbox
												className="h-[18px] w-[18px] border-primary-dark-200 rounded"
												onClick={() =>
													toggleSelectList(
														selectedItems,
														setSelectedItems,
														investor.id,
													)
												}
												checked={isChecked(
													selectedItems,
													investor.id,
												)}
											/>
											<div className="flex items-center gap-[10px]">
												<div className="flex flex-col gap-[5px]">
													<h5 className="heading-5 dark:text-primary-black-light">
														{investor.name}
													</h5>
													<span className="text-base-3 !text-primary-orange-dark hover:underline">
														<Link
															href={`mailto:${investor.email}`}
														>
															{investor.email}
														</Link>
													</span>
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="text-base-2">
											{investor.phoneNumber}
										</span>
									</TableCell>
									<TableCell>
										<span className="text-base-2">
											{investor.project
												? investor.project.name
												: investor.projectName}
										</span>
									</TableCell>
									<TableCell>
										{investor?.status && (
											<span
												className={`bg-primary-orange-dark bg-opacity-10 px-2 py-1 rounded-sm text-base-2`}
											>
												{
													InvestmentStatusFormat[
														investor.status
													]
												}
											</span>
										)}
									</TableCell>
									<TableCell>
										<span className="text-base-2">
											{dateFormat(investor?.createdAt)}
										</span>
									</TableCell>
									<TableCell>
										<Menubar className="px-0 border-none bg-transparent">
											<MenubarMenu>
												<MenubarTrigger className="cursor-pointer">
													<BsThreeDots />
												</MenubarTrigger>
												<MenubarContent className="absolute -right-[30px] bg-white min-w-[140px]">
													<MenubarItem className="hover:bg-primary-black-light hover:bg-opacity-5">
														<Link
															href={`/admin/project/edit?project_id=${investor.id}`}
															className="w-full"
														>
															Edit now
														</Link>
													</MenubarItem>
													<MenubarItem className="hover:bg-primary-black-light hover:bg-opacity-5">
														<Link
															href={`/admin/project/edit?project_id=${investor.id}`}
															className="w-full"
														>
															View detail
														</Link>
													</MenubarItem>
												</MenubarContent>
											</MenubarMenu>
										</Menubar>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{/* <Pagination
						pages={pages}
						containerClass={'justify-center mt-[50px]'}
						prevBtnClass={'btn-primary'}
						nextBtnClass={'btn-primary'}
						paginateBtnClass={
							'btn-primary__ghost !bg-transparent dark:text-primary-orange-dark text-primary-orange-dark hover:text-white dark:hover:text-white w-[40px]'
						}
						paginateActiveClass={'btn-primary !text-white'}
					/> */}
				</>
			) : (
				<EmptyError
					containerClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					thumbnailClass={'sm:w-[70%] w-[80%]'}
					title={'There are no projects to show'}
					description={`Oops! Currently, there are no projects to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={undefined}
					titleClass={''}
					descriptionClass={''}
				/>
			)}
		</div>
	);
};

export default InvestmentList;
