import EmptyError from '@/components/shared/Cards/EmptyError';
import FileDocCard from '@/components/shared/Cards/FileDocCard';
import ProjectInterest from '@/components/shared/Modal/ProjectInterest';
import ProjectGallery from '@/components/shared/Slider/ProjectGallery';
import { fetchProjectDetailsBySlug } from '@/lib/actions/project.action';
import { dateFormat } from '@/lib/helper/format';
type SearchParams = {
	params: {
		slug: string;
	};
};

const ProjectDetailsPage = async ({ params }: SearchParams) => {
	const result = await fetchProjectDetailsBySlug({
		slug: params.slug ? params.slug : null,
	});
	return (
		<main>
			<section
				id="gallery"
				className="py-[80px] bg-dark__200-light__white"
			>
				<div className="container">
					{result ? (
						<div className="flex flex-col gap-[60px]">
							<div className="project__header">
								<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px] items-center">
									<ProjectGallery
										alt={result.name}
										thumbnail={
											result?.thumbnail
												? result?.thumbnail
												: null
										}
										gallery={
											result.gallery
												? result.gallery.files
												: null
										}
									/>
									<div className="flex flex-col gap-[35px]">
										<div className="flex flex-col gap-[15px]">
											<h2 className="heading-2">
												{result.name}
											</h2>
											{result.location &&
												result.location.length > 0 && (
													<p className="text-base-3 dark:text-white dark:text-opacity-70 flex flex-wrap items-center gap-[6px]">
														<strong>
															Location:
														</strong>
														<span>
															{result.location}
														</span>
													</p>
												)}
										</div>
										<div className="grid lg:grid-cols-3 grid-cols-2 gap-[20px]">
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5">
													Industry
												</h5>
												<p className="text-base-3 dark:text-white dark:text-opacity-60">
													{result.category &&
														result.category.name}
												</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5">
													Target Amount
												</h5>
												<p className="text-base-3 dark:text-white dark:text-opacity-60">
													${result.targetAmount}
												</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5">
													Total Cost
												</h5>
												<p className="text-base-3 dark:text-white dark:text-opacity-60">
													${result.totalCost}
												</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5">
													Total Revenue
												</h5>
												<p className="text-base-3 dark:text-white dark:text-opacity-60">
													${result.totalRevenue}
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
													{dateFormat(
														result.closeDate,
													)}
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
							{result.documents &&
								result.documents.length > 0 && (
									<div className="project__files">
										<div className="grid md:grid-cols-2 lg:gap-[40px] gap-[25px]">
											{result.documents.map(
												(file, index) => (
													<FileDocCard
														key={index}
														name={file.name}
														description={
															file.description
														}
														id={file.id}
														fileUrl={file.file.url}
													/>
												),
											)}
										</div>
									</div>
								)}

							<div className="project__content">
								<p className="text-base-2 dark:text-white">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quisquam ad provident
									nulla dolorem temporibus reprehenderit
									minus, suscipit facilis id at eos deserunt
									eligendi commodi, aspernatur eveniet, labore
									amet necessitatibus? Voluptates dolores
									saepe et mollitia ex, maxime repellendus
									eveniet aut sapiente cumque dolorem fugit
									cum nisi ducimus accusamus autem odio nulla
									at vel. Magni odit nam natus, est corrupti
									in nesciunt iure ipsa deserunt? Modi beatae
									omnis similique magni maiores,
									necessitatibus neque repellat aliquid
									incidunt laudantium repellendus laboriosam
									illum ullam illo nostrum quia itaque natus
									iste vero in ducimus fuga odit impedit?
									Eaque at necessitatibus laudantium non,
									rerum consequatur explicabo saepe harum
									impedit error autem corrupti voluptas et,
									inventore, ex pariatur fugit. Praesentium
									officia blanditiis delectus, veritatis
									doloremque ab minus molestiae.
								</p>
							</div>
						</div>
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

export default ProjectDetailsPage;
