'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { InvestmentStatusFormat, dateFormat } from '@/lib/helper/format';
import {
	isChecked,
	isSelectAll,
	toggleSelectAll,
	toggleSelectList,
} from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import InvestorForm from '../Forms/InvestorForm';
type InvestorListProps = {
	data: InvestorList[];
};

const InvestorList: React.FC<InvestorListProps> = ({ data }) => {
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [single, setSingle] = useState<string | null>(null);

	return (
		<Table className="shadow-light-100">
			<TableHeader>
				<TableRow className="border-b border-admin-gray-light border-opacity-25">
					<TableHead className="table-header__bg-tl">
						<div className="flex items-center gap-[5px]">
							<Checkbox
								id="select-all"
								className="h-[18px] w-[18px] border-primary-dark-200 rounded"
								checked={isSelectAll<InvestorList>(
									data,
									selectedItems,
								)}
								onClick={() =>
									toggleSelectAll<InvestorList>(
										data,
										selectedItems,
										setSelectedItems,
									)
								}
							/>
							<label htmlFor="select-all">Investor</label>
						</div>
					</TableHead>
					<TableHead className="table-header__bg">Phone #</TableHead>
					<TableHead className="table-header__bg">Project</TableHead>
					<TableHead className="table-header__bg">Status</TableHead>
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
					<Collapsible key={index} asChild>
						<>
							<TableRow>
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
													<CollapsibleTrigger
														className="w-full text-left"
														onClick={() => {
															setSingle(
																investor.id,
															);
														}}
													>
														Edit now
													</CollapsibleTrigger>
												</MenubarItem>
												<MenubarItem
													className="hover:bg-primary-black-light hover:bg-opacity-5 cursor-pointer"
													onClick={() => {}}
												>
													<span>Delete now</span>
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
							<CollapsibleContent asChild>
								<TableRow>
									<TableCell
										className="p-4 !pr-4"
										colSpan={6}
									>
										<InvestorForm id={single} />
									</TableCell>
								</TableRow>
							</CollapsibleContent>
						</>
					</Collapsible>
				))}
			</TableBody>
		</Table>
	);
};

export default InvestorList;
