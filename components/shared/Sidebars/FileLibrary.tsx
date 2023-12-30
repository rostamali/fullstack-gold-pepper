'use client';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import FileCard from '../Cards/FileCard';
import FileUpdate from '../Forms/FileUpdate';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { deleteFilesByAdmin } from '@/lib/actions/file.action';
import LocalSearch from '../Search/LocalSearch';
import SelectFilter from '../Search/SelectFilter';
import { FilesFilter } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { isChecked, toggleSelectList } from '@/lib/utils';
import EmptyError from '../Cards/EmptyError';
import Pagination from '../Search/Pagination';
import Link from 'next/link';

type FileCardProps = {
	files: FileType[];
	pages: number;
};

const FileLibrary: React.FC<FileCardProps> = ({ files, pages }) => {
	const [isPending, setIsPending] = useState(false);
	const [fileDetails, setFileDetails] = useState<FileType | null>(null);
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);

	const handleDeleteFile = async (fileId: string) => {
		setIsPending(true);
		try {
			const result = await deleteFilesByAdmin({
				fileId: [fileId],
			});
			setIsPending(false);
			if (result.success) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} catch (error: any) {
			setIsPending(false);
			toast.error(error.message);
		}
	};
	const handleDeleteSelectedFile = async () => {
		setIsPending(true);
		try {
			if (selectedItems) {
				const result = await deleteFilesByAdmin({
					fileId: selectedItems,
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
				toast.error('Empty selected files');
			}
		} catch (error: any) {
			setIsPending(false);
			toast.error(error.message);
		}
	};

	return (
		<div className="file-library">
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
						route={'/admin/files'}
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
							options={FilesFilter}
						/>
					</div>
				</div>
			</div>
			{files?.length > 0 ? (
				<Sheet>
					<div className="grid 2lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[20px]">
						{files.map((file, index) => (
							<div
								className="relative file-card-wrap"
								key={index}
							>
								<SheetTrigger asChild>
									<div
										className="single-file-card"
										onClick={() => {
											setFileDetails(file);
										}}
									>
										<FileCard file={file} />
									</div>
								</SheetTrigger>
								<Checkbox
									className="h-[25px] border border-primary-dark-100 border-opacity-40 w-[25px] absolute top-3 right-3 rounded-full bg-admin-gray-light text-primary-black-light text-[14px]"
									onClick={() =>
										toggleSelectList(
											selectedItems,
											setSelectedItems,
											file.id,
										)
									}
									checked={isChecked(selectedItems, file.id)}
								/>
							</div>
						))}
					</div>
					<SheetContent
						side="right"
						className="bg-white data-[state=open]:bg-secondary border-l border-l-primary-dark-100 xm:w-[350px] w-[260px] dark:border-opacity-10 border-opacity-10"
					>
						<h3 className="heading-3 dark:text-primary-black-dark">
							Edit file
						</h3>
						{fileDetails && (
							<div className="flex flex-col gap-[10px] mt-[30px]">
								<FileCard file={fileDetails} />
								<div className="flex items-center justify-end gap-[20px]">
									<Button className="p-0 text-primary-black-light underline outline-none focus-visible:ring-0">
										Compress
									</Button>
									<SheetClose asChild>
										<Button
											className="p-0 text-primary-orange-dark underline outline-none focus-visible:ring-0"
											onClick={() =>
												handleDeleteFile(fileDetails.id)
											}
											disabled={isPending}
										>
											Delete
										</Button>
									</SheetClose>
								</div>
								<FileUpdate fileDetails={fileDetails} />
							</div>
						)}
					</SheetContent>
				</Sheet>
			) : (
				<EmptyError
					containerClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					thumbnailClass={'sm:w-[70%] w-[80%]'}
					title={'There are no files to show'}
					description={`Whoa! It looks like the files directory is currently empty. 📂 No files are present in this location.
					`}
					Links={undefined}
					titleClass={''}
					descriptionClass={''}
				/>
			)}
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
		</div>
	);
};

export default FileLibrary;
