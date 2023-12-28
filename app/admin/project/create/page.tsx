import ProjectForm from '@/components/ProjectForm';
import GoBack from '@/components/ui/goback';
import { FiChevronLeft } from 'react-icons/fi';

const CreateProjectPage = () => {
	return (
		<div className="create-project">
			<div className="flex items-center justify-between">
				<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark flex items-center gap-[5px]">
					<GoBack
						trigger={<FiChevronLeft className="text-[20px] " />}
					/>
					New project
				</h2>
			</div>
			<ProjectForm
				type={'create'}
				project_id={null}
				defaultValues={null}
			/>
		</div>
	);
};

export default CreateProjectPage;
