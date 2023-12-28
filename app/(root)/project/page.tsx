import ProjectCard from '@/components/shared/Cards/ProjectCard';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import Pagination from '@/components/shared/Search/Pagination';
import SelectFilter from '@/components/shared/Search/SelectFilter';
type SearchParams = {
	searchParams: {
		q: string;
	};
};

const ProjectPage = ({ searchParams }: SearchParams) => {
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
					<div className="project__list pt-[50px]">
						<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px]">
							{[1, 2, 3, 4, 5, 6].map((project, index) => (
								<ProjectCard key={index} />
							))}
						</div>
						<Pagination
							pages={5}
							containerClass={'justify-end'}
							prevBtnClass={''}
							nextBtnClass={''}
							paginateBtnClass={''}
							paginateActiveClass={'dark:bg-opacity-40'}
						/>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ProjectPage;
