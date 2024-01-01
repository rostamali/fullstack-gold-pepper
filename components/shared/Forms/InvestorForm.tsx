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
import { InvestorFormSchema } from '@/lib/helper/formValidation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { InvestmentStatus } from '@/constants';
import {
	fetchInvestmentDetailsById,
	updateInvestmentDetailsByAdmin,
} from '@/lib/actions/investment.action';
import toast from 'react-hot-toast';

type InvestorFormProps = {
	id: string | null;
};

const InvestorForm: React.FC<InvestorFormProps> = ({ id }) => {
	const [isPending, setIsPending] = useState(false);
	const [investor, setInvestor] = useState<InvestorFormInfo | null>(null);
	const form = useForm<z.infer<typeof InvestorFormSchema>>({
		resolver: zodResolver(InvestorFormSchema),
	});
	const fetchInvestor = async () => {
		const result = await fetchInvestmentDetailsById({
			id: id as string,
		});
		if (result) {
			setInvestor(result);
		} else {
			setInvestor(null);
		}
	};
	useEffect(() => {
		fetchInvestor();
	}, [id]);
	const handleUpdateInvestor = async (
		data: z.infer<typeof InvestorFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await updateInvestmentDetailsByAdmin({
				id: investor?.id as string,
				amount: data.amount,
				equity: data.equity,
				ownerShip: data.ownerShip,
				status: data.status as InvestmentStatus,
			});
			if (result.success) {
				toast.success(result.message);
				setIsPending(false);
			} else {
				toast.error(result.message);
				setIsPending(false);
			}
		} catch (error: any) {
			setIsPending(false);
			toast.error(error.message);
		}
	};
	if (!investor)
		return (
			<div className="flex items-center justify-center">
				<ButtonLoader
					className={'h-[26px] w-[26px] stroke-primary-orange-dark'}
				/>
			</div>
		);

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-[25px]"
					onSubmit={form.handleSubmit(handleUpdateInvestor)}
				>
					<div className="grid grid-cols-2 gap-[25px]">
						<FormField
							control={form.control}
							name="amount"
							defaultValue={investor.amount ? investor.amount : 0}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="auth-input__label">
										Investment amount
									</FormLabel>
									<FormControl>
										<Input
											type="text"
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
							defaultValue={investor.equity ? investor.equity : 0}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="auth-input__label">
										Equity
									</FormLabel>
									<FormControl>
										<Input
											type="text"
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
							defaultValue={
								investor.ownerShip ? investor.ownerShip : 0
							}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="auth-input__label">
										Ownership %
									</FormLabel>
									<FormControl>
										<Input
											type="text"
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
							defaultValue={
								investor.status ? investor.status : 'PENDING'
							}
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
										className={
											'h-[16px] w-[16px] stroke-white'
										}
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
		</>
	);
};

export default InvestorForm;
