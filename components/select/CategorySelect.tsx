import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronsUpDown, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { fetchCategoryList } from '@/lib/actions/category.action';
type CategoryList = {
	name: string;
	id: string;
	slug: string;
};
type CategorySelectProps = {
	triggerClass: string;
	contentClass: string;
	defaultValue: string;
	placeholder: string;
	onChange: (val: string) => void;
};

const CategorySelect: React.FC<CategorySelectProps> = ({
	triggerClass,
	contentClass,
	defaultValue,
	placeholder,
	onChange,
}) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(defaultValue);
	const [data, setData] = useState<CategoryList[] | []>([]);

	const fetchCategories = async () => {
		const result = await fetchCategoryList();
		if (result) {
			setData(result?.categories);
		} else {
			setData([]);
		}
	};
	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`justify-between ${triggerClass}`}
				>
					{value
						? data.find((cat) => cat.slug === value)?.name
						: placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={`p-0 ${contentClass}`}>
				<Command className="min-w-full">
					<CommandInput placeholder="Search category..." />
					<CommandEmpty>No item found.</CommandEmpty>
					<CommandGroup>
						{data
							? data.map((cat, index) => (
									<CommandItem
										key={index}
										value={cat.slug}
										onSelect={(currentValue) => {
											setValue(
												currentValue === value
													? ''
													: currentValue,
											);
											setOpen(false);
											onChange(
												currentValue === value
													? ''
													: currentValue,
											);
										}}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4',
												value === cat.id
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
										{cat.name}
									</CommandItem>
							  ))
							: null}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default CategorySelect;
