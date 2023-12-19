import Image from 'next/image';

const ProjectCard = () => {
	return (
		<div className="flex sm:items-center gap-[25px] sm:flex-row flex-col group cursor-pointer">
			<Image
				src={'/images/business-network.jpg'}
				alt={''}
				width={1280}
				height={853}
				priority={true}
				className="h-[250px] lg:w-[250px] md:w-[300px] sm:w-[250px] w-full object-cover rounded-md"
			/>
			<div className="flex flex-col gap-[15px]">
				<p className="text-base-3 !text-primary-orange-dark">
					Category
				</p>
				<h3 className="text-[20px] dark:text-white font-semibold group-hover:text-primary-orange-dark">
					Blog title heading will go here
				</h3>
				<p className="text-base-3 dark:text-white">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Suspendisse varius enim...
				</p>
				<div className="grid grid-cols-2 gap-[10px]">
					<div className="flex flex-col gap-[2px]">
						<h5 className="heading-5">Industry</h5>
						<p className="text-base-3 !text-white !text-opacity-60">
							Construction
						</p>
					</div>
					<div className="flex flex-col gap-[2px] xl:block lg:hidden">
						<h5 className="heading-5">Target Amount</h5>
						<p className="text-base-3 !text-white !text-opacity-60">
							$172.36382
						</p>
					</div>
					<div className="flex flex-col gap-[2px] xl:block lg:hidden">
						<h5 className="heading-5"># of investors</h5>
						<p className="text-base-3 !text-white !text-opacity-60">
							3
						</p>
					</div>
					<div className="flex flex-col gap-[2px]">
						<h5 className="heading-5">Close Date</h5>
						<p className="text-base-3 !text-white !text-opacity-60">
							15 Nov, 2023
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
