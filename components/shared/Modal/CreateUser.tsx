import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CreateUserForm from '../Forms/CreateUserForm';

const CreateUser = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary !h-[50px]">Add User</Button>
			</DialogTrigger>
			<DialogContent className="md:max-w-[450px] max-w-[85%] bg-white border-none">
				<DialogHeader>
					<DialogTitle>
						<div className="heading-3 text-primary-black-dark dark:text-primary-black-dark mb-[8px]">
							Create User
						</div>
					</DialogTitle>
					<DialogDescription>
						<span className="text-base-2 text-primary-black-dark dark:text-primary-black-dark">
							Fill out the form below to create new account and
							unlock the full potential of this platform.
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="mt-[10px]">
					<CreateUserForm />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateUser;
