'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
type DatePickerProps = {
	triggerClass: string;
	onChange: (val: Date | undefined) => void;
	defaultValue: Date;
};

const DatePicker: React.FC<DatePickerProps> = ({
	triggerClass,
	onChange,
	defaultValue,
}) => {
	const [date, setDate] = React.useState<Date>(new Date(defaultValue));
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						`w-full justify-start text-left font-normal ${triggerClass}`,
						!date && 'text-muted-foreground',
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0 bg-white">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(val) => {
						setDate(val as Date);
						onChange(val);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DatePicker;
