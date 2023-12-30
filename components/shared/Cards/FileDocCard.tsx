import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';
type DocProps = {
	name: string;
	description: string | null;
	id: string;
	fileUrl: string;
};

const FileDocCard: React.FC<DocProps> = ({ name, description, fileUrl }) => {
	return (
		<div className="dark:bg-primary-dark-100 rounded-md p-[20px] border border-primary-black-thin dark:border-transparent">
			<div className="flex flex-col justify-between gap-[10px]">
				<div className="flex justify-between gap-[10px]">
					<h4 className="heading-4">{name}</h4>
					<Button className="bg-primary-dark-200 text-white text-[17px]">
						<FiDownload />
					</Button>
				</div>
				<p className="text-base-3 dark:text-white">{description}</p>
			</div>
		</div>
	);
};

export default FileDocCard;
