import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
type ServiceCardProps = {
	data: {
		name: string;
		description: string;
		icon: any;
		url?: string;
	};
	link: boolean;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ data, link }) => {
	return (
		<div className="flex flex-col gap-[15px]">
			<data.icon className="text-[40px] text-primary-black-dark dark:text-white" />
			<h3 className="text-[20px] dark:text-white font-semibold">
				{data.name}
			</h3>
			<p className="text-base-3 dark:text-white">{data.description}</p>
			{link && (
				<Link href={data.url ? data.url : ''} className="btn-text-icon">
					Link
					<FiChevronRight />
				</Link>
			)}
		</div>
	);
};

export default ServiceCard;
