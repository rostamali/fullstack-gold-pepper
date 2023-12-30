import Image from 'next/image';
type EmptyErrorProps = {
	containerClass: string;
	thumbnailClass: string;
	title: string;
	titleClass: string;
	description: string;
	descriptionClass: string;
	Links: React.ReactNode;
};

const EmptyError: React.FC<EmptyErrorProps> = ({
	containerClass,
	thumbnailClass,
	Links,
	title,
	titleClass,
	description,
	descriptionClass,
}) => {
	return (
		<div
			className={`flex flex-col gap-[20px] ${
				containerClass?.length > 0 ? containerClass : 'items-center'
			}`}
		>
			<Image
				src={'/images/error-message.png'}
				alt={''}
				width={384}
				height={268}
				priority={true}
				className={`object-contain ${thumbnailClass}`}
			/>
			<h3
				className={`text-[22px] text-primary-black-dark font-bold ${titleClass}`}
			>
				{title}
			</h3>
			<p className={`text-base-2 ${descriptionClass}`}>{description}</p>
			{Links}
		</div>
	);
};

export default EmptyError;
