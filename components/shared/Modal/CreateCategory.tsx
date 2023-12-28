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
import CreateCategory from '../Forms/CreateCategory';

const createCategoryByAdmin = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary !h-[50px]">Add Category</Button>
			</DialogTrigger>
			<DialogContent className="md:max-w-[600px] max-w-[85%] bg-white border-none">
				<DialogHeader>
					<DialogTitle>
						<div className="heading-3 text-primary-black-dark dark:text-primary-black-dark mb-[8px]">
							Create Category
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
					<CreateCategory />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default createCategoryByAdmin;
