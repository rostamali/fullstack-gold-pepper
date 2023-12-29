'use client';
import { uploadFilesByAdmin } from '@/lib/actions/file.action';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import ButtonLoader from '../Spinners/ButtonLoader';

const FileuploadField = () => {
	const [isPending, setIsPending] = useState(false);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		handleUploadFiles(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const handleUploadFiles = async (files: File[]) => {
		setIsPending(true);
		try {
			const formData = new FormData();
			files.forEach((file) => {
				formData.append('files', file);
			});
			const result = await uploadFilesByAdmin(formData);
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

	return (
		<div
			className={`border-2 border-dashed  h-[250px] rounded-[12px] px-[25px] cursor-pointer ${
				isDragActive ? 'border-brand-red' : 'border-black-dark'
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
	);
};

export default FileuploadField;
