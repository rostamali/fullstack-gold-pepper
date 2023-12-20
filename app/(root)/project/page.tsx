import ProjectCard from '@/components/shared/Cards/ProjectCard';

const ProjectPage = () => {
	return (
		<main>
			<section
				id="projects"
				className="py-[80px] bg-dark__200-light__white"
			>
				<div className="container">
					<div className="project__list">
						<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px]">
							{[1, 2, 3, 4, 5, 6].map((project, index) => (
								<ProjectCard key={index} />
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ProjectPage;
