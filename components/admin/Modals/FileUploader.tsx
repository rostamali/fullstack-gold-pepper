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
				<Button className="btn-primary">New File</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-white border-none">
				<DialogHeader>
					<DialogTitle>Submit Proposal</DialogTitle>
					<DialogDescription>
						Send us your interest, one of our support team will
						contact you soon.
					</DialogDescription>
				</DialogHeader>
				<FileuploadField />
			</DialogContent>
		</Dialog>
	);
};

export default FileUploader;
