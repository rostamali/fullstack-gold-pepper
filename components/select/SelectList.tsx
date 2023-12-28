import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
type SelectListProps = {
	triggerClass: string;
	placeholder: string;
	contentClass: string;
	defaultValue: string;
	options: {
		label: string;
		value: string;
	}[];
	onValueChange: (value: string) => void;
};

const SelectList: React.FC<SelectListProps> = ({
	triggerClass,
	placeholder,
	contentClass,
	options,
	defaultValue,
	onValueChange,
}) => {
	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
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

export default SelectList;
