'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import ButtonLoader from '../Spinners/ButtonLoader';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import { importProjectFromCSV } from '@/lib/actions/project.action';
import { importCategoryFromCSV } from '@/lib/actions/category.action';
type CSVModel = {
	type: 'project' | 'category';
};

const UploadCsv: React.FC<CSVModel> = ({ type }) => {
	const [isPending, setIsPending] = useState(false);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		const csvFiles = acceptedFiles.filter(
			(file) => file.type === 'text/csv',
		);
		if (csvFiles.length) {
			if (csvFiles.length === 1) {
				handleUploadFiles(csvFiles[0]);
			} else {
				toast.error('Please drop a single CSV file');
			}
		} else {
			toast.error('Upload CSV file only');
		}
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const handleUploadFiles = (file: File) => {
		setIsPending(true);
		try {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: async function (value) {
					if (type === 'project') {
						const result = await importProjectFromCSV(
							value.data as CSVProject[],
						);
						setIsPending(false);
						if (result.success) {
							toast.success(result.message);
						} else {
							toast.error(result.message);
						}
					} else if (type === 'category') {
						const result = await importCategoryFromCSV(
							value.data as CSVCategory[],
						);
						setIsPending(false);
						if (result.success) {
							toast.success(result.message);
						} else {
							toast.error(result.message);
						}
					}
				},
			});
		} catch (error: any) {
			setIsPending(false);
			toast.error(error.message);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary !h-[50px] !px-[15px]">
					Upload CSV
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[550px] bg-white border-none">
				<DialogHeader>
					<DialogTitle>
						<div className="heading-3 text-primary-black-dark dark:text-primary-black-dark mb-[8px]">
							Upload Files
						</div>
					</DialogTitle>
					<DialogDescription>
						<span className="text-base-2 text-primary-black-dark dark:text-primary-black-dark">
							Upload files by dragging or clicking to browse. The
							system will handle the upload automatically.
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="mt-[10px]">
					<div
						className={`border-2 border-dashed  h-[250px] rounded-[12px] px-[25px] cursor-pointer ${
							isDragActive
								? 'border-brand-red'
								: 'border-black-dark'
						}`}
					>
						{!isPending ? (
							<div className="h-full" {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive ? (
									<div className="flex flex-col items-center justify-center h-full gap-[8px]">
										<FiUpload className="text-[40px] text-primary-black-light text-opacity-80" />
										<h4 className="heading-4 text-primary-black-dark dark:text-primary-black-dark">
											Drag the files here...
										</h4>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-full gap-[8px]">
										<FiUpload className="text-[40px] text-primary-black-light text-opacity-80" />
										<h3 className="text-[20px] font-semibold text-primary-black-dark dark:text-primary-black-dark">
											Drag and Drop file
										</h3>
										<h4 className="heading-4 text-primary-black-dark dark:text-primary-black-dark">
											or
										</h4>
										<span className="btn-primary inline-block !px-[30px]">
											Browse
										</span>
									</div>
								)}
							</div>
						) : (
							<div className="flex items-center justify-center h-full">
								<div className="flex flex-col gap-[10px] items-center">
									<ButtonLoader
										className={
											'stroke-primary-orange-dark h-[30px] w-[30px]'
										}
									/>
									<span className="heading-4 dark:text-primary-black-dark">
										Uploading
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UploadCsv;
