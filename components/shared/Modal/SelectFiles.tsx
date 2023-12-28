'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { fetchFilesOnModal } from '@/lib/actions/file.action';
import { useEffect, useState } from 'react';
import FileCard from '../Cards/FileCard';
import { FilesFilter } from '@/constants';
type SelectFilesProps = {
	trigger: React.ReactNode;
	modalTitle: string;
	selectType: 'gallery' | 'thumbnail';
	defaultFile: FileType[] | [];
	onInsertFiles: (file: FileType[]) => void;
};

const SelectFiles: React.FC<SelectFilesProps> = ({
	selectType,
	trigger,
	modalTitle,
	defaultFile,
	onInsertFiles,
}) => {
	// Fetch files
	const [data, setData] = useState<{
		files: FileType[] | null;
		isNext: boolean;
	} | null>();
	const [fileFilter, setFileFilter] = useState({
		type: 'image',
		page: 1,
		pageSize: 9,
	});
	const fetchData = async (filter: {
		type: string;
		page: number;
		pageSize: number;
	}) => {
		const result = await fetchFilesOnModal(filter);
		if (result) {
			setData(result);
		} else {
			setData(null);
		}
	};
	useEffect(() => {
		fetchData({
			...fileFilter,
		});
	}, [fileFilter]);

	// Handle files selections
	const [selectedFiles, setSelectedFiles] = useState<FileType[]>(defaultFile);
	const toggleFileSelection = (newFile: FileType) => {
		if (selectType === 'gallery') {
			const isSelected = selectedFiles.find(
				(item) => item?.id === newFile?.id,
			);
			if (isSelected) {
				setSelectedFiles(
					selectedFiles.filter((item) => item?.id !== newFile.id),
				);
			} else {
				setSelectedFiles([...selectedFiles, newFile]);
			}
		} else {
			if (selectedFiles.includes(newFile)) {
				setSelectedFiles([]);
			} else {
				setSelectedFiles([newFile]);
			}
		}
	};
	const isSelected = (file: FileType) => {
		const result =
			selectedFiles?.length > 0 ? selectedFiles?.includes(file) : false;

		return result || false;
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				{trigger ? trigger : <Button className="">Select File</Button>}
			</DialogTrigger>
			<DialogContent className="xl:max-w-[1200px] max-w-[95%] bg-white border-none">
				<DialogHeader>
					<DialogTitle>
						<div className="heading-3 text-primary-black-dark dark:text-primary-black-dark mb-[8px]">
							{modalTitle}
						</div>
					</DialogTitle>
					<DialogDescription>
						<span className="text-base-2 text-primary-black-dark dark:text-primary-black-dark">
							Upload files by dragging or clicking to browse. The
							system will handle the upload automatically.
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="select-file-filter flex items-center gap-[15px]">
					{FilesFilter.map((filter, index) => (
						<Button
							className={`text-[14px] ${
								fileFilter.type === filter.value
									? 'text-primary-orange-dark bg-primary-orange-dark bg-opacity-10'
									: 'bg-admin-gray-light text-[#7B8ED1]'
							}`}
							key={index}
							onClick={() =>
								setFileFilter({
									...fileFilter,
									type: filter.value,
									page: 1,
								})
							}
						>
							{filter.label}
						</Button>
					))}
				</div>
				<div className="mt-[10px] xl:max-h-[500px] xm:max-h-[400px] max-h-[500px] overflow-y-scroll py-[20px] px-[10px]">
					<div className="grid lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[20px]">
						{data
							? data.files
								? data.files.length > 0
									? data.files.map((file, index) => (
											<div
												className={`file-card-wrap ${
													isSelected(file)
														? 'ring-2 rounded-md ring-offset-[3px]'
														: ''
												}`}
												onClick={() =>
													toggleFileSelection(file)
												}
												key={index}
											>
												<FileCard file={file} />
											</div>
									  ))
									: null
								: null
							: null}
					</div>
					{data && data.isNext && (
						<Button
							onClick={() =>
								setFileFilter({
									...fileFilter,
									page: fileFilter.page + 1,
								})
							}
						>
							Load More
						</Button>
					)}
				</div>
				<div className="flex items-center justify-between gap-[20px]">
					<div className="flex items-center gap-[20px]">
						<span className="text-base-2">
							{selectedFiles.length > 0
								? selectedFiles.length
								: 0}{' '}
							file selected
						</span>
						<Button className="btn-primary__ghost !h-[50px] !px-[20px]">
							Delete
						</Button>
					</div>
					<DialogClose asChild>
						<Button
							className="btn-primary !h-[50px] !px-[20px]"
							disabled={selectedFiles.length > 0 ? false : true}
							onClick={() => {
								onInsertFiles(selectedFiles);
							}}
						>
							Insert
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SelectFiles;
