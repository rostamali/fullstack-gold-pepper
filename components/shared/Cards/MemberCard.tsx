'use client';
import { Button } from '@/components/ui/button';
import { teamMembers } from '@/constants';
import Image from 'next/image';
import { useState } from 'react';

type TeamMemberProps = {
	name: string;
	title: string;
	description: string;
	index: number;
	thumbnail: string;
};

const MemberCard: React.FC<TeamMemberProps> = ({
	name,
	title,
	description,
	index,
	thumbnail,
}) => {
	const [showFullDescription, setShowFullDescription] = useState(
		Array(teamMembers.length).fill(false),
	);

	const toggleDescription = (index: number) => {
		const newShowFullDescription = [...showFullDescription];
		newShowFullDescription[index] = !newShowFullDescription[index];
		setShowFullDescription(newShowFullDescription);
	};

	return (
		<div className="flex flex-col gap-[20px] items-start">
			<Image
				src={`/images/team/${thumbnail}`}
				alt={name}
				width={1280}
				height={1920}
				className="object-cover w-[150px] h-[150px] object-top rounded-full"
			/>
			<div className="member-info">
				<h4 className="heading-4">{name}</h4>
				<span className="text-base-4 dark:text-white dark:text-opacity-60">
					{title}
				</span>
			</div>
			<p className="text-base-3 dark:text-white">
				{showFullDescription[index]
					? description
					: `${description.slice(0, 120)}...`}
			</p>
			<Button
				onClick={() => toggleDescription(index)}
				className="!text-primary-orange-light dark:!text-primary-orange-light !text-[14px] p-0 py-0 h-6"
			>
				{showFullDescription[index] ? 'Read Less' : 'Read More'}
			</Button>
		</div>
	);
};

export default MemberCard;
