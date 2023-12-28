import { FiImage } from 'react-icons/fi';
type PlaceholderProps = {
	containerClass: string;
	iconClass: string;
};

const Placeholder: React.FC<PlaceholderProps> = ({
	containerClass,
	iconClass,
}) => {
	return (
		<div
			className={`flex items-center justify-center rounded-md border border-admin-gray-dark border-opacity-60 ${containerClass}`}
		>
			<FiImage
				className={`text-[30px] text-primary-black-light text-opacity-50 ${iconClass}`}
			/>
		</div>
	);
};

export default Placeholder;
