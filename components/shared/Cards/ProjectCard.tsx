import Image from 'next/image';
import Link from 'next/link';
import Placeholder from './Placeholder';
import { dateFormat } from '@/lib/helper/format';
type ProjectCardProps = {
	name: string;
	slug: string;
	category: string | null;
	thumbnail: string | null;
	targetAmount: number;
	capex: number;
	roi: number;
	closeDate: Date;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
	name,
	slug,
	category,
	thumbnail,
	targetAmount,
	closeDate,
	capex,
	roi,
}) => {
	return (
		<Link
			href={`/project/${slug}`}
			className="grid sm:grid-cols-2 col-span-1 gap-[30px] items-center group cursor-pointer "
		>
			<div>
				{thumbnail ? (
					<Image
						src={`/files/uploads/${thumbnail}`}
						alt={''}
						width={1280}
						height={853}
						priority={true}
						className="h-[220px] object-cover rounded-md"
					/>
				) : (
					<Placeholder
						containerClass={
							'h-[220px] border-[2px] !border-admin-gray-dark !border-opacity-30'
						}
						iconClass={
							'text-[100px] text-admin-gray-dark !text-opacity-25'
						}
					/>
				)}
			</div>
			<div className="flex flex-col gap-[15px]">
				<div className="flex flex-col gap-[6px]">
					<h3 className="text-[20px] dark:text-white font-semibold group-hover:text-white group-hover:text-opacity-60">
						{name}
					</h3>
					<p className="text-base-3 !text-primary-orange-dark">
						{category ? category : 'Uncategorized'}
					</p>
				</div>
				{/* <p className="text-base-3 dark:text-white">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Suspendisse varius enim...
				</p> */}
				<div className="grid grid-cols-2 gap-[10px]">
					<div className="flex flex-col gap-[2px]">
						<h5 className="heading-5">Capex</h5>
						<p className="text-base-3 dark:text-white dark:text-opacity-60">
							{capex}
						</p>
					</div>
					<div className="flex flex-col gap-[2px] xl:flex lg:hidden">
						<h5 className="heading-5">Target Amount</h5>
						<p className="text-base-3 dark:text-white dark:text-opacity-60">
							${targetAmount}
						</p>
					</div>
					<div className="flex flex-col gap-[2px] xl:flex lg:hidden">
						<h5 className="heading-5">ROI</h5>
						<p className="text-base-3 dark:text-white dark:text-opacity-60">
							{roi}
						</p>
					</div>
					<div className="flex flex-col gap-[2px]">
						<h5 className="heading-5">Close Date</h5>
						<p className="text-base-3 dark:text-white dark:text-opacity-60">
							{dateFormat(closeDate)}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
