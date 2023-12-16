import Link from 'next/link';

const TextLogo = () => {
	return (
		<Link
			href="/"
			className="inline-block font-spaceGrotesk font-bold text-[26px] text-primary-black-dark dark:text-white"
		>
			Gold <span className="text-primary-orange-dark">& Pepper</span>
		</Link>
	);
};

export default TextLogo;
