'use client';
import { uploadFilesByAdmin } from '@/lib/actions/file.action';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const FileuploadField = () => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		handleUploadFiles(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const handleUploadFiles = async (files: File[]) => {
		try {
			const formData = new FormData();
			files.forEach((file) => {
				formData.append('files', file);
			});
			const result = await uploadFilesByAdmin(formData);
			if (result.success) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div
			{...getRootProps()}
			className={`border-2 border-dashed  h-[180px] rounded-[12px] px-[25px] cursor-pointer ${
				isDragActive ? 'border-brand-red' : 'border-black-dark'
			}`}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<div className="flex flex-col items-center justify-center h-full">
					<div className="relative">
						{/* <IoIosDocument className="text-[60px] text-[#dbdcdf]" /> */}
						<div className="bg-black-dark h-[30px] w-[30px] flex items-center justify-center rounded-full absolute right-0 bottom-0">
							{/* <AiOutlineCloudUpload className="text-[20px] text-white" /> */}
						</div>
					</div>
					<div className="text-[16px] font-medium text-black-dark">
						Drag your file here...
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-full gap-[8px]">
					<div className="relative">
						{/* <IoIosDocument className="text-[60px] text-[#dbdcdf]" /> */}
						<div className="bg-black-dark h-[30px] w-[30px] flex items-center justify-center rounded-full absolute right-0 bottom-0">
							{/* <AiOutlineCloudUpload className="text-[20px] text-white" /> */}
						</div>
					</div>
					<div className="text-[16px] font-medium text-black-dark text-center">
						<span className="underline font-bold">
							Click to upload
						</span>{' '}
						or drag and drop
					</div>
					<span className="text-body text-[14px]">
						Maximum file size: 50 MB.
					</span>
				</div>
			)}
		</div>
	);
};

export default FileuploadField;
