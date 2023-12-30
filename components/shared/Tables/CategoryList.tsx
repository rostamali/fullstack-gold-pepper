'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import LocalSearch from '../Search/LocalSearch';
import SelectFilter from '../Search/SelectFilter';
import { useState } from 'react';
import { CategoriesFilter } from '@/constants';
import Image from 'next/image';
import Placeholder from '../Cards/Placeholder';
import {
	isChecked,
	isSelectAll,
	toggleSelectAll,
	toggleSelectList,
} from '@/lib/utils';
import { FiEdit } from 'react-icons/fi';
import { Checkbox } from '@/components/ui/checkbox';
import { deleteCategoryByAdmin } from '@/lib/actions/category.action';
import toast from 'react-hot-toast';
import UpdateCategory from '../Forms/UpdateCategory';
import EmptyError from '../Cards/EmptyError';
import { dateFormat } from '@/lib/helper/format';
import Pagination from '../Search/Pagination';
type CategoryListProps = {
	data: CategoryType[];
	pages: number;
};

const CategoryList: React.FC<CategoryListProps> = ({ data, pages }) => {
	const [isPending, setIsPending] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const handleDeleteSelectedFile = async () => {
		setIsPending(true);
		try {
			if (selectedItems) {
				const result = await deleteCategoryByAdmin({
					categoryId: selectedItems,
				});
				setIsPending(false);
				if (result.success) {
					toast.success(result.message);
					setSelectedItems(null);
				} else {
					toast.error(result.message);
				}
			} else {
				setIsPending(false);
				toast.error('Empty selected category');
			}
		} catch (error: any) {
			setIsPending(false);
			toast.error(error.message);
		}
	};

	// fetch single category
	const [singleCat, setSingleCat] = useState<UpdateCategory | null>(null);

	return (
		<div className="category-list">
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
						route={'/admin/project/categories'}
						iconPosition={'left'}
						placeholder={'Search files'}
						containerClass={
							'bg-white border border-admin-gray-dark border-opacity-70 col-span-3'
						}
						inputClass={'text-primary-black-light'}
						iconClass={'text-primary-black-light text-opacity-40'}
					/>
					<div className="col-span-2">
						<SelectFilter
							filterKey={'type'}
							placeholder={'Filter by files'}
							triggerClass={
								'bg-white border border-admin-gray-dark border-opacity-70 text-primary-black-light text-opacity-60 h-[52px]'
							}
							contentClass={'bg-white'}
							options={CategoriesFilter}
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
											checked={isSelectAll<CategoryType>(
												data,
												selectedItems,
											)}
											onClick={() =>
												toggleSelectAll<CategoryType>(
													data,
													selectedItems,
													setSelectedItems,
												)
											}
										/>
										<label htmlFor="select-all">
											Category
										</label>
									</div>
								</TableHead>
								<TableHead className="table-header__bg">
									Description
								</TableHead>
								<TableHead className="table-header__bg">
									# Projects
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
							{data.map((cat, index) => (
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
																cat.id,
															)
														}
														checked={isChecked(
															selectedItems,
															cat.id,
														)}
													/>
													<div className="flex items-center gap-[10px]">
														{cat.thumbnail ? (
															<Image
																src={`/files/uploads/${cat?.thumbnail?.url}`}
																alt={cat.name}
																width={400}
																height={400}
																className="h-[55px] w-[55px] rounded-md bg-white border border-admin-gray-dark border-opacity-30 object-cover"
															/>
														) : (
															<Placeholder
																containerClass={
																	'h-[55px] w-[55px] rounded-md'
																}
																iconClass={
																	'!text-[25px]'
																}
															/>
														)}
														<div className="flex flex-col gap-[5px]">
															<h5 className="heading-5 dark:text-primary-black-light">
																{cat.name}
															</h5>
															<span className="text-base-3">
																{cat.slug}
															</span>
														</div>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<span className="text-base-2">
													{cat?.description
														? cat.description
														: null}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-base-2">
													{cat.projects
														? cat.projects.length
														: 0}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-base-2">
													{dateFormat(cat.createdAt)}
												</span>
											</TableCell>
											<TableCell>
												<CollapsibleTrigger asChild>
													<Button
														className="bg-admin-gray-light text-[#7B8ED1]"
														onClick={() => {
															setSingleCat({
																name: cat.name,
																description:
																	cat.description,
																thumbnail:
																	cat.thumbnail,
																id: cat.id,
															});
														}}
													>
														<FiEdit className="text-[15px]" />
													</Button>
												</CollapsibleTrigger>
											</TableCell>
										</TableRow>
										<CollapsibleContent asChild>
											<>
												<TableRow>
													<TableCell colSpan={5}>
														<UpdateCategory
															data={singleCat}
														/>
													</TableCell>
												</TableRow>
											</>
										</CollapsibleContent>
									</>
								</Collapsible>
							))}
						</TableBody>
					</Table>
					<Pagination
						pages={pages}
						containerClass={'justify-center mt-[50px]'}
						prevBtnClass={'btn-primary'}
						nextBtnClass={'btn-primary'}
						paginateBtnClass={
							'btn-primary__ghost !bg-transparent dark:text-primary-orange-dark text-primary-orange-dark hover:text-white dark:hover:text-white w-[40px]'
						}
						paginateActiveClass={'btn-primary !text-white'}
					/>
				</>
			) : (
				<EmptyError
					containerClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					thumbnailClass={'sm:w-[70%] w-[80%]'}
					title={'There are no categories to show'}
					description={`Oops! Currently, there are no categories to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={undefined}
					titleClass={''}
					descriptionClass={''}
				/>
			)}
		</div>
	);
};

export default CategoryList;
