import ProjectForm from '@/components/ProjectForm';
import EmptyError from '@/components/shared/Cards/EmptyError';
import GoBack from '@/components/ui/goback';
import { fetchProjectDetailsById } from '@/lib/actions/project.action';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

type SearchParams = {
	searchParams: {
		project_id: string;
	};
};

const EditProjectpage = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectDetailsById({
		id: searchParams.project_id,
	});
	console.log(result);

	return (
		<div className="project-edit">
			{result ? (
				<>
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-between">
							<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark flex items-center gap-[5px]">
								<GoBack
									trigger={
										<FiChevronLeft className="text-[20px] " />
									}
								/>
								Edit project
							</h2>
						</div>
						<Link
							href=""
							className="btn-primary sm:h-[48px] !text-[14px]"
						>
							View Project
						</Link>
					</div>
					<ProjectForm
						type={'edit'}
						project_id={result.id}
						defaultValues={{
							name: result?.name,
							location: result?.location ? result?.location : '',
							status: result?.status,
							minInvestment: result?.minInvestment,
							capex: result?.capex,
							totalRevenue: result?.totalRevenue,
							totalCost: result?.totalCost,
							roi: result?.roi,
							targetAmount: result?.targetAmount,
							closeDate: new Date(result?.closeDate),
							documents: result?.documents
								? result?.documents
								: [],
							gallery: [],
							thumbnail: result?.thumbnail
								? [result?.thumbnail]
								: [],
							category: result?.category
								? result?.category?.slug
								: '',
						}}
					/>
				</>
			) : (
				<EmptyError
					containerClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					thumbnailClass={'sm:w-[70%] w-[80%]'}
					title={'There are no projects to show'}
					description={`Oops! Currently, there are no projects to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={
						<Link
							href="/admin/project"
							className="btn-primary !h-[50px] !text-[15px] !px-[15px]"
						>
							Go Back Projects
						</Link>
					}
				/>
			)}
		</div>
	);
};

export default EditProjectpage;
