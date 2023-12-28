import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';

const FileDocCard = () => {
	return (
		<div className="dark:bg-primary-dark-100 rounded-md p-[20px] border border-primary-black-thin dark:border-transparent">
			<div className="flex flex-col justify-between gap-[10px]">
				<div className="flex justify-between gap-[10px]">
					<h4 className="heading-4">
						Businesses & Capabilities Document 1
					</h4>
					<Button className="bg-primary-dark-200 text-white text-[17px]">
						<FiDownload />
					</Button>
				</div>

				<p className="text-base-3 dark:text-white">
					Gold & Pepper provides SMEs with a complete technical and
					financial consultancy service. Gold & Pepper provides SMEs
					with a complete technical and financial consultancy service.
				</p>
			</div>
		</div>
	);
};

export default FileDocCard;
