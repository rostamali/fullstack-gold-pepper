'use client';
import Image from 'next/image';
import SelectFiles from '../shared/Modal/SelectFiles';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FiTrash2 } from 'react-icons/fi';

type GalleryProps = {
	onFileChange: (val: FileType[]) => void;
	defaultThumbnail: FileType[];
	containerClass: string;
	fileHeightClass: string;
};

const GallerySelect: React.FC<GalleryProps> = ({
	onFileChange,
	defaultThumbnail,
	containerClass,
	fileHeightClass,
}) => {
	const [value, setValue] = useState<FileType[] | []>([]);

	const handleRemovedGallery = (file: FileType) => {
		const filterFile = value.filter((item) => item.id !== file.id);
		setValue(filterFile);
		onFileChange(filterFile);
	};
	useEffect(() => {
		setValue(defaultThumbnail);
	}, [value]);

	return (
		<div>
			<div className={containerClass}>
				{value.length > 0 &&
					value.map((file, index) => (
						<div className="relative group rounded-md overflow-hidden">
							<Image
								key={index}
								src={`/files/uploads/${file.url}`}
								alt={file.fileName}
								width={400}
								height={400}
								className={`w-full object-cover ${fileHeightClass}`}
							/>
							<div className="absolute opacity-0 w-full h-full top-0 left-0 bg-primary-dark-100 bg-opacity-40 flex flex-col items-center justify-center gap-[10px] duration-150 group-hover:opacity-[1]">
								<Button
									type="button"
									onClick={() => handleRemovedGallery(file)}
								>
									<FiTrash2 className="text-white text-[22px]" />
								</Button>
							</div>
						</div>
					))}
				{value.length > 0 && (
					<SelectFiles
						trigger={
							<div
								className={`border border-admin-gray-dark ${fileHeightClass} flex items-center justify-center rounded-md cursor-pointer bg-white`}
							>
								<div className="flex flex-col items-center gap-[10px]">
									<span className="border border-gray-dark py-[6px] px-[14px] text-[14px] font-medium rounded-md">
										Add more
									</span>
								</div>
							</div>
						}
						modalTitle={'Project Gallery'}
						selectType={'gallery'}
						defaultFile={value}
						onInsertFiles={(val) => {
							onFileChange(val), setValue(val);
						}}
					/>
				)}
			</div>
			{value.length === 0 && (
				<SelectFiles
					trigger={
						<div className="border border-admin-gray-dark h-[180px] w-full flex items-center justify-center rounded-md duration-150 bg-white relative overflow-hidden group">
							<div className="flex flex-col items-center gap-[15px]">
								<span className="border border-gray-dark py-[8px] px-[14px] text-[14px] font-medium rounded-md cursor-pointer">
									Select Images
								</span>
								<span className="text-body text-[14px]">
									Chose only image types
								</span>
							</div>
						</div>
					}
					modalTitle={'Project Gallery'}
					selectType={'gallery'}
					defaultFile={value}
					onInsertFiles={(val) => {
						onFileChange(val), setValue(val);
					}}
				/>
			)}
		</div>
	);
};

export default GallerySelect;
