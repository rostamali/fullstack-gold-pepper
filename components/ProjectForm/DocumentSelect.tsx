'use client';
import { useState } from 'react';
import SelectFiles from '../shared/Modal/SelectFiles';
import { Button } from '../ui/button';
import FileCard from '../shared/Cards/FileCard';

type DocumentProps = {
	onFileChange: (val: SelectFileType[]) => void;
	defaultDocument: SelectFileType[];
};

const DocumentSelect: React.FC<DocumentProps> = ({
	onFileChange,
	defaultDocument,
}) => {
	const [value, setValue] = useState<SelectFileType[] | []>(defaultDocument);
	return (
		<div>
			<SelectFiles
				trigger={
					<div className="border border-admin-gray-dark h-[100px] w-full flex items-center justify-center rounded-md duration-150 bg-white relative overflow-hidden group">
						{value?.length > 0 ? (
							<>
								<FileCard file={value[0]} />
								<div className="absolute opacity-0 w-full h-full top-0 left-0 bg-primary-dark-100 bg-opacity-40 flex flex-col items-center justify-center gap-[10px] duration-150 group-hover:opacity-[1]">
									<span className="border border-white text-white py-[8px] px-[14px] text-[14px] font-medium rounded-md cursor-pointer">
										Chose another
									</span>
								</div>
							</>
						) : (
							<div className="flex flex-col items-center gap-[15px]">
								<span className="border border-gray-dark py-[8px] px-[14px] text-[14px] font-medium rounded-md cursor-pointer">
									Select Document
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
				loadType={'application'}
			/>
			{value?.length > 0 && (
				<Button
					className="p-0 text-primary-orange-dark font-normal"
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

export default DocumentSelect;
