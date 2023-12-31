import { Input } from '@/components/ui/input';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonLoader from '../Spinners/ButtonLoader';
import { Checkbox } from '@/components/ui/checkbox';
import { InvestorFormSchema } from '@/lib/helper/formValidation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { InvestmentStatus } from '@/constants';
type InvestorFormProps = {
	id: string | null;
};

const InvestorForm: React.FC<InvestorFormProps> = ({ id }) => {
	const [isPending, setIsPending] = useState(false);
	const [investor, setInvestor] = useState(null);
	const fetchInvestor = async () => {
		// const result await
	};

	const form = useForm<z.infer<typeof InvestorFormSchema>>({
		resolver: zodResolver(InvestorFormSchema),
	});
	const handleUpdateInvestor = () => {};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-[25px]"
				onSubmit={form.handleSubmit(handleUpdateInvestor)}
			>
				<div className="grid grid-cols-2 gap-[25px]">
					<FormField
						control={form.control}
						name="amount"
						defaultValue={0}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Investment amount
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										className="auth-input__field"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="equity"
						defaultValue={0}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Equity
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										className="auth-input__field"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="ownerShip"
						defaultValue={0}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Ownership %
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										className="auth-input__field"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Status
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										value={field.value}
									>
										<SelectTrigger
											className="auth-input__field"
											{...field}
										>
											<SelectValue placeholder="Select Role" />
										</SelectTrigger>
										<SelectContent className="bg-white">
											{InvestmentStatus.map(
												(role, index) => (
													<SelectItem
														className="pl-2"
														value={role.value.toString()}
														key={index}
													>
														{role.label}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
				</div>

				<div className="auth-input__group">
					<Button
						className="btn-primary gap-[5px]"
						disabled={isPending}
					>
						{isPending ? (
							<div className="flex items-center gap-[5px]">
								<ButtonLoader
									className={'h-[16px] w-[16px] stroke-white'}
								/>
								Updating
							</div>
						) : (
							'Save update'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default InvestorForm;
