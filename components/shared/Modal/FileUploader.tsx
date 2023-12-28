import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import FileuploadField from '../Forms/FileuploadField';

const FileUploader = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary !h-[50px]">Upload Files</Button>
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
					<FileuploadField />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default FileUploader;
