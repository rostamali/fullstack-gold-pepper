'use client';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
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
	placeholder: string;
	triggerClass: string;
	contentClass: string;
	options: {
		label: string;
		value: string;
	}[];
};

const SelectFilter: React.FC<SelectFilterProps> = ({
	filterKey,
	placeholder,
	triggerClass,
	contentClass,
	options,
}) => {
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
			<SelectTrigger
				className={`w-full rounded-md h-[50px] focus:ring-0 focus:ring-offset-0 shadow-none ${
					triggerClass.length > 0
						? triggerClass
						: 'border-none dark:bg-primary-dark-100 text-white'
				}`}
			>
				<SelectValue
					placeholder={placeholder.length > 0 ? placeholder : ''}
				/>
			</SelectTrigger>
			<SelectContent
				className={`${
					contentClass.length > 0
						? contentClass
						: 'dark:bg-primary-dark-100 border-none text-white'
				}`}
			>
				<SelectGroup>
					{options.length > 0 ? (
						options.map((item, index) => (
							<SelectItem
								key={index}
								value={item.value}
								className="pl-2"
							>
								{item.label}
							</SelectItem>
						))
					) : (
						<SelectLabel className="pl-2">
							No options found
						</SelectLabel>
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SelectFilter;
