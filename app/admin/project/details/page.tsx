import ProjectInterest from '@/components/shared/Modal/ProjectInterest';
import ProjectGallery from '@/components/shared/Slider/ProjectGallery';
import GoBack from '@/components/ui/goback';
import { viewProjectDetailsById } from '@/lib/actions/project.action';
import { dateFormat } from '@/lib/helper/format';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvestorList from '@/components/shared/Tables/InvestorList';

type SearchParams = {
	searchParams: {
		project_id: string;
	};
};

const ProjectDetailsPage = async ({ searchParams }: SearchParams) => {
	const result = await viewProjectDetailsById({
		id: searchParams.project_id as string,
	});
	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between">
					<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark flex items-center gap-[5px]">
						<GoBack
							trigger={<FiChevronLeft className="text-[20px] " />}
						/>
						Project Details
					</h2>
				</div>
				{result && result && (
					<Link
						target="_blank"
						href={`/project/${result?.project?.slug}`}
						className="btn-primary sm:h-[48px] !text-[14px]"
					>
						View Project
					</Link>
				)}
			</div>
			<div className="project-details">
				{result ? (
					result.project ? (
						<div className="flex flex-col gap-[60px]">
							<div className="project__header">
								<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px] items-center">
									<ProjectGallery
										alt={result.project.name}
										thumbnail={
											result?.project?.thumbnail
												? result?.project?.thumbnail
												: null
										}
										gallery={
											result?.project?.gallery
												? result?.project?.gallery.files
												: null
										}
									/>
									<div className="flex flex-col gap-[35px]">
										<div className="flex flex-col gap-[15px]">
											<h2 className="heading-2 dark:text-primary-black-dark">
												{result?.project?.name}
											</h2>
											{result?.project?.location &&
												result?.project?.location
													.length > 0 && (
													<p className="text-base-3 flex flex-wrap items-center gap-[6px]">
														<strong>
															Location:
														</strong>
														<span>
															{
																result?.project
																	?.location
															}
														</span>
													</p>
												)}
										</div>
										<div className="grid lg:grid-cols-3 grid-cols-2 gap-[20px]">
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5 dark:text-primary-black-dark">
													Industry
												</h5>
												<p className="text-base-3">
													{result?.project
														?.category &&
														result?.project
															?.category.name}
												</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5 dark:text-primary-black-dark">
													Target Amount
												</h5>
												<p className="text-base-3 ">
													$
													{
														result?.project
															?.targetAmount
													}
												</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5 dark:text-primary-black-dark">
													Total Cost
												</h5>
												<p className="text-base-3">
													$
													{result?.project?.totalCost}
												</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5 dark:text-primary-black-dark">
													Total Revenue
												</h5>
												<p className="text-base-3">
													$
													{
														result?.project
															?.totalRevenue
													}
												</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5 dark:text-primary-black-dark">
													# of investors
												</h5>
												<p className="text-base-3">3</p>
											</div>
											<div className="flex flex-col gap-[5px]">
												<h5 className="heading-5 dark:text-primary-black-dark">
													Close Date
												</h5>
												<p className="text-base-3">
													{dateFormat(
														result?.project
															?.closeDate,
													)}
												</p>
											</div>
										</div>
										<div className="lg:flex flex items-center md:hidden gap-[12px]">
											<div className="h-[55px] w-[55px] bg-primary-black-light rounded-full"></div>
											<div>
												<h5 className="heading-5 dark:text-primary-black-dark">
													Rostam Ali
												</h5>
												<p className="text-base-3 ">
													Instruction
												</p>
											</div>
										</div>
										<div className="flex flex-col gap-[15px] items-start">
											<h3 className="heading-3 dark:text-primary-black-dark">
												Send us your interest
											</h3>
											<ProjectInterest
												projectId={result?.project?.id}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="project-details__tab">
								<Tabs defaultValue="investors">
									<TabsList>
										<TabsTrigger value="investors">
											Investors
										</TabsTrigger>
										<TabsTrigger value="password">
											Password
										</TabsTrigger>
									</TabsList>
									<TabsContent value="investors">
										<InvestorList data={result.investors} />
									</TabsContent>
									<TabsContent value="password">
										Change your password here.
									</TabsContent>
								</Tabs>
							</div>
						</div>
					) : (
						'Empty Nothing'
					)
				) : (
					'Empty Nothing'
				)}
			</div>
		</div>
	);
};

export default ProjectDetailsPage;
