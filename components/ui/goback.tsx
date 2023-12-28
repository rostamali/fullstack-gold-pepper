'use client';
import { useRouter } from 'next/navigation';
import { Button } from './button';

const GoBack = ({ trigger }: { trigger: React.ReactNode }) => {
	const router = useRouter();

	return (
		<Button
			className="p-0 outline-none focus:ring-0"
			onClick={() => router.back()}
		>
			{trigger}
		</Button>
	);
};

export default GoBack;
