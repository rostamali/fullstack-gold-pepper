import FileDocCard from '@/components/shared/Cards/FileDocCard';
import ProjectInterest from '@/components/shared/Modal/ProjectInterest';
import ProjectGallery from '@/components/shared/Slider/ProjectGallery';

const ProjectDetailsPage = () => {
	return (
		<main>
			<section
				id="gallery"
				className="py-[80px] bg-dark__200-light__white"
			>
				<div className="container">
					<div className="flex flex-col gap-[60px]">
						<div className="project__header">
							<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px] items-center">
								<ProjectGallery />
								<div className="flex flex-col gap-[35px]">
									<div className="flex flex-col gap-[15px]">
										<h2 className="heading-2">
											Blog title heading will go here
										</h2>
										<p className="text-base-3 dark:text-white dark:text-opacity-70 flex flex-wrap items-center gap-[6px]">
											<strong>Location:</strong>
											<span>
												129/3 Rajshahi court, Rajshahi
												Bangladesh
											</span>
										</p>
									</div>
									<div className="grid lg:grid-cols-3 grid-cols-2 gap-[20px]">
										<div className="flex flex-col gap-[5px]">
											<h5 className="heading-5">
												Industry
											</h5>
											<p className="text-base-3 dark:text-white dark:text-opacity-60">
												Construction
											</p>
										</div>
										<div className="flex flex-col gap-[5px]">
											<h5 className="heading-5">
												Target Amount
											</h5>
											<p className="text-base-3 dark:text-white dark:text-opacity-60">
												$172.36382
											</p>
										</div>
										<div className="flex flex-col gap-[5px]">
											<h5 className="heading-5">
												Target Amount
											</h5>
											<p className="text-base-3 dark:text-white dark:text-opacity-60">
												$172.36382
											</p>
										</div>
										<div className="flex flex-col gap-[5px]">
											<h5 className="heading-5">
												Target Amount
											</h5>
											<p className="text-base-3 dark:text-white dark:text-opacity-60">
												$172.36382
											</p>
										</div>
										<div className="flex flex-col gap-[5px]">
											<h5 className="heading-5">
												# of investors
											</h5>
											<p className="text-base-3 dark:text-white dark:text-opacity-60">
												3
											</p>
										</div>
										<div className="flex flex-col gap-[5px]">
											<h5 className="heading-5">
												Close Date
											</h5>
											<p className="text-base-3 dark:text-white dark:text-opacity-60">
												15 Nov, 2023
											</p>
										</div>
									</div>
									<div className="lg:flex flex items-center md:hidden gap-[12px]">
										<div className="h-[55px] w-[55px] bg-primary-black-light rounded-full"></div>
										<div>
											<h5 className="heading-5">
												Rostam Ali
											</h5>
											<p className="text-base-3 dark:text-white">
												Instruction
											</p>
										</div>
									</div>
									<div className="flex flex-col gap-[15px] items-start">
										<h3 className="heading-3">
											Send us your interest
										</h3>
										<ProjectInterest />
									</div>
								</div>
							</div>
						</div>
						<div className="project__files">
							<div className="grid md:grid-cols-2 lg:gap-[40px] gap-[25px]">
								{[1, 2, 3, 4].map((file, index) => (
									<FileDocCard key={index} />
								))}
							</div>
						</div>
						<div className="project__content">
							<p className="text-base-2 dark:text-white">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quisquam ad provident nulla
								dolorem temporibus reprehenderit minus, suscipit
								facilis id at eos deserunt eligendi commodi,
								aspernatur eveniet, labore amet necessitatibus?
								Voluptates dolores saepe et mollitia ex, maxime
								repellendus eveniet aut sapiente cumque dolorem
								fugit cum nisi ducimus accusamus autem odio
								nulla at vel. Magni odit nam natus, est corrupti
								in nesciunt iure ipsa deserunt? Modi beatae
								omnis similique magni maiores, necessitatibus
								neque repellat aliquid incidunt laudantium
								repellendus laboriosam illum ullam illo nostrum
								quia itaque natus iste vero in ducimus fuga odit
								impedit? Eaque at necessitatibus laudantium non,
								rerum consequatur explicabo saepe harum impedit
								error autem corrupti voluptas et, inventore, ex
								pariatur fugit. Praesentium officia blanditiis
								delectus, veritatis doloremque ab minus
								molestiae.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ProjectDetailsPage;
