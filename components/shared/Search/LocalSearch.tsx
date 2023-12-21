'use client';
import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
type FilterProps = {
	route: string;
	iconPosition: 'left' | 'right';
	placeholder: string;
};

const LocalSearch: React.FC<FilterProps> = ({
	route,
	iconPosition,
	placeholder,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams.get('q');
	const [search, setSearch] = useState(query || '');

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'q',
					value: search,
				});
				router.push(newUrl, { scroll: false });
			} else {
				if (pathname === route) {
					const newUrl = removeKeysFromQuery({
						params: searchParams.toString(),
						keysToRemove: ['q'],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 300);
		return () => clearTimeout(delayDebounceFn);
	}, [search, pathname, router, searchParams, query]);

	return (
		<div
			className={`flex items-center dark:bg-primary-dark-100 rounded-md px-[12px] ${
				iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'
			}`}
		>
			<FiSearch className="text-[20px] text-white text-opacity-60" />
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={placeholder.length ? placeholder : 'Search now...'}
				className="bg-transparent border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-[50px] text-white"
			/>
		</div>
	);
};

export default LocalSearch;
