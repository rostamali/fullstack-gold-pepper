import UploadCsv from '@/components/shared/Modal/UploadCsv';
import ProjectList from '@/components/shared/Tables/ProjectList';
import { fetchProjectsByAdmin } from '@/lib/actions/project.action';
import Link from 'next/link';
type SearchParams = {
	searchParams: {
		page: string;
		status: ProjectStatus;
		q: string | null;
	};
};

const AdminProjectPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectsByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		status: searchParams.status
			? (searchParams.status.toLocaleUpperCase() as ProjectStatus)
			: null,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex items-center justify-between">
				<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark">
					Projects
				</h2>
				<div className="flex items-center gap-[10px]">
					<Link
						href="/admin/project/create"
						className="btn-primary !h-[50px] !px-[25px]"
					>
						Add Project
					</Link>
					<UploadCsv type={'project'} />
				</div>
			</div>
			{result && result.projects && (
				<ProjectList pages={result.pages} data={result.projects} />
			)}
		</div>
	);
};

export default AdminProjectPage;
