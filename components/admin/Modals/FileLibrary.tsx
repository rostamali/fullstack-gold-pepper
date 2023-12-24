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

type FileCardProps = {
	files: FileType[];
};

const FileLibrary: React.FC<FileCardProps> = ({ files }) => {
	const [isPending, setIsPending] = useState(false);
	const [fileDetails, setFileDetails] = useState<FileType | null>(null);
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

	return (
		<div className="file-card">
			<Sheet>
				<div className="grid grid-cols-3 gap-[20px]">
					{files.map((file, index) => (
						<SheetTrigger asChild key={index}>
							<div
								onClick={() => {
									setFileDetails(file);
								}}
							>
								<FileCard file={file} />
							</div>
						</SheetTrigger>
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
		</div>
	);
};

export default FileLibrary;
