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
import EmptyError from '../Cards/EmptyError';
type SelectFilesProps = {
	loadType: 'image' | 'video' | 'application' | 'all' | string;
	trigger: React.ReactNode;
	modalTitle: string;
	selectType: 'gallery' | 'thumbnail';
	defaultFile: SelectFileType[] | [];
	onInsertFiles: (file: SelectFileType[]) => void;
};

const SelectFiles: React.FC<SelectFilesProps> = ({
	selectType,
	trigger,
	modalTitle,
	defaultFile,
	onInsertFiles,
	loadType,
}) => {
	// Fetch files
	const [data, setData] = useState<{
		files: SelectFileType[] | null;
		isNext: boolean;
	} | null>();

	const [fileFilter, setFileFilter] = useState({
		type: loadType,
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
	const [selectedFiles, setSelectedFiles] = useState<SelectFileType[]>([]);
	useEffect(() => {
		setSelectedFiles(defaultFile);
	}, [defaultFile]);
	const toggleFileSelection = (newFile: SelectFileType) => {
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
	const isSelected = (file: SelectFileType) => {
		return selectedFiles?.some(
			(selectedFile) => selectedFile.id === file.id,
		);
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
				<div className="select-file-filter flex items-center gap-[15px] flex-wrap">
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
				{data ? (
					data.files && data.files.length > 0 ? (
						<div className="mt-[10px] xl:max-h-[500px] xm:max-h-[400px] max-h-[500px] overflow-y-scroll py-[20px] px-[10px]">
							<div className="grid lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[20px]">
								{data.files.map((file, index) => (
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
								))}
							</div>
						</div>
					) : (
						<EmptyError
							containerClass={
								'sm:max-w-[450px] max-w-[300px] justify-center mx-auto text-center items-center md:py-[60px] py-[20px]'
							}
							thumbnailClass={'sm:w-[70%] w-[80%]'}
							title={'There are no files to show'}
							description={`Whoa! It looks like the files directory is currently empty. 📂 No files are present in this location.
			`}
							Links={undefined}
						/>
					)
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
					/>
				)}
				<div className="flex items-center justify-between gap-[20px] xm:flex-row flex-col">
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
							className="btn-primary !h-[50px] !px-[20px]  max-xm:w-full"
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
