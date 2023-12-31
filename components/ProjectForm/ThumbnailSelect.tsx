import Image from 'next/image';
import SelectFiles from '../shared/Modal/SelectFiles';
import { useState } from 'react';
import { Button } from '../ui/button';
type ThumbnailProps = {
	onFileChange: (val: SelectFileType[]) => void;
	defaultThumbnail: SelectFileType[];
	frameClass: string;
};

const ThumbnailSelect: React.FC<ThumbnailProps> = ({
	onFileChange,
	defaultThumbnail,
	frameClass,
}) => {
	const [value, setValue] = useState<SelectFileType[] | []>(defaultThumbnail);

	return (
		<div className="relative w-full">
			<SelectFiles
				trigger={
					<div
						className={`border border-admin-gray-dark w-full flex items-center justify-center rounded-md duration-150 bg-white relative overflow-hidden group ${frameClass}`}
					>
						{value?.length > 0 ? (
							<>
								<Image
									src={`/files/uploads/${value[0].url}`}
									alt={value[0].title}
									width={400}
									height={400}
									className="h-full w-full object-cover"
								/>
								<div className="absolute opacity-0 w-full h-full top-0 left-0 bg-primary-dark-100 bg-opacity-40 flex flex-col items-center justify-center gap-[10px] duration-150 group-hover:opacity-[1]">
									<span className="border border-white text-white py-[8px] px-[14px] text-[14px] font-medium rounded-md cursor-pointer">
										Choose another
									</span>
									<span className="text-base-2 !text-white text-[14px]">
										Choose only image types
									</span>
								</div>
							</>
						) : (
							<div className="flex flex-col items-center gap-[15px]">
								<span className="border border-gray-dark py-[8px] px-[14px] text-[14px] font-medium rounded-md cursor-pointer">
									Select Thumbnail
								</span>
								<span className="text-body text-[14px]">
									Choose only image types
								</span>
							</div>
						)}
					</div>
				}
				modalTitle={'Project Thumbnail'}
				selectType={'thumbnail'}
				defaultFile={value}
				onInsertFiles={(val) => {
					onFileChange(val), setValue(val);
				}}
				loadType={'image'}
			/>
			{value?.length > 0 && (
				<Button
					className="p-0 text-primary-orange-dark font-normal absolute right-0 top-[-40px]"
					onClick={() => {
						setValue([]);
						onFileChange([]);
					}}
				>
					Removed
				</Button>
			)}
		</div>
	);
};

export default ThumbnailSelect;
