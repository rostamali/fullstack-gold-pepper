import EmptyError from '@/components/shared/Cards/EmptyError';
import ProjectCard from '@/components/shared/Cards/ProjectCard';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import Pagination from '@/components/shared/Search/Pagination';
import SelectFilter from '@/components/shared/Search/SelectFilter';
import { fetchProjectsByUser } from '@/lib/actions/project.action';
import Link from 'next/link';
type SearchParams = {
	searchParams: {
		page: string;
		q: string | null;
	};
};

const ProjectPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchProjectsByUser({
		pageSize: 6,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<main>
			<section
				id="projects"
				className="py-[80px] bg-dark__200-light__white"
			>
				<div className="container">
					<div className="project__filters">
						<div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[15px]">
							<div className="col-span-2">
								<LocalSearch
									route={'/project'}
									iconPosition={'left'}
									placeholder={
										'Search for specific project...'
									}
									containerClass={''}
									inputClass={''}
									iconClass={''}
								/>
							</div>
							<SelectFilter
								filterKey={'filter'}
								placeholder={''}
								triggerClass={''}
								contentClass={''}
								options={[]}
							/>
							<SelectFilter
								filterKey={'years'}
								placeholder={''}
								triggerClass={''}
								contentClass={''}
								options={[]}
							/>
						</div>
					</div>
					{result ? (
						result.projects.length > 0 ? (
							<div className="project__list pt-[50px]">
								<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px]">
									{result.projects.map((project, index) => (
										<ProjectCard
											key={index}
											name={project.name}
											slug={project.slug}
											closeDate={project.closeDate}
											targetAmount={project.targetAmount}
											capex={project.capex}
											roi={project.roi}
											category={
												project.category
													? project.category.name
													: null
											}
											thumbnail={
												project.thumbnail
													? project.thumbnail.url
													: null
											}
										/>
									))}
								</div>
								<Pagination
									pages={result.pages}
									containerClass={'justify-center mt-[50px]'}
									prevBtnClass={''}
									nextBtnClass={''}
									paginateBtnClass={''}
									paginateActiveClass={'dark:bg-opacity-40'}
								/>
							</div>
						) : (
							<EmptyError
								containerClass={
									'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
								}
								thumbnailClass={'sm:w-[70%] w-[80%]'}
								title={'There are no projects to show'}
								description={`Oops! Currently, there are no projects to display. 🏷️`}
								Links={
									<Link href="/" className="btn-primary">
										Back to Home
									</Link>
								}
								titleClass={'dark:text-white'}
								descriptionClass={'dark:text-white'}
							/>
						)
					) : (
						<EmptyError
							containerClass={
								'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
							}
							thumbnailClass={'sm:w-[70%] w-[80%]'}
							title={'There are no projects to show'}
							description={`Oops! Currently, there are no projects to display. 🏷️`}
							Links={undefined}
							titleClass={'dark:text-white'}
							descriptionClass={'dark:text-white'}
						/>
					)}
				</div>
			</section>
		</main>
	);
};

export default ProjectPage;
