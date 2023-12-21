'use client';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
type SelectFilterProps = {
	filterKey: string;
};

const SelectFilter: React.FC<SelectFilterProps> = ({ filterKey }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const paramFilter = searchParams.get(filterKey);

	const handleFilterClick = (value: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: filterKey,
			value: value.toLowerCase(),
		});
		router.push(newUrl, { scroll: false });
	};

	return (
		<Select
			onValueChange={handleFilterClick}
			defaultValue={paramFilter || undefined}
		>
			<SelectTrigger className="w-full border-none dark:bg-primary-dark-100 rounded-md h-[50px] focus:ring-0 focus:ring-offset-0 shadow-none text-white">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent className="dark:bg-primary-dark-100 border-none text-white">
				<SelectGroup>
					<SelectLabel className="pl-2">Fruits</SelectLabel>
					{['apple', 'orange', 'lemon'].map((item, index) => (
						<SelectItem key={index} value={item} className="pl-2">
							{item}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SelectFilter;
