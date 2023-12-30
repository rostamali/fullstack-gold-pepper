'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
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
import { useState } from 'react';
import { ProjectInterestFormSchema } from '@/lib/helper/formValidation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonLoader from '../Spinners/ButtonLoader';
import { Checkbox } from '@/components/ui/checkbox';
import toast from 'react-hot-toast';
import { submitProjectInterested } from '@/lib/actions/investment.action';

const ProjectInterest = ({ projectId }: { projectId: string }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ProjectInterestFormSchema>>({
		resolver: zodResolver(ProjectInterestFormSchema),
	});

	const handleProjectInterest = async (
		data: z.infer<typeof ProjectInterestFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await submitProjectInterested({
				amount: data.investmentAmount,
				phoneNumber: data.contactPhone,
				agreeTerm: data.acceptTerms,
				projectId: projectId,
			});
			setIsPending(false);
			if (result.success) {
				toast.success(result.message);
				form.reset();
			} else {
				toast.error(result.message);
			}
		} catch (error: any) {
			setIsPending(false);
			toast.error(error.message);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary">Send your interest!</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-white border-none">
				<DialogHeader>
					<DialogTitle>Submit Proposal</DialogTitle>
					<DialogDescription>
						Send us your interest, one of our support team will
						contact you soon.
					</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form
							className="flex flex-col gap-[25px]"
							onSubmit={form.handleSubmit(handleProjectInterest)}
						>
							<FormField
								control={form.control}
								name="investmentAmount"
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
								name="contactPhone"
								defaultValue=""
								render={({ field }) => (
									<FormItem>
										<FormLabel className="auth-input__label">
											Phone number
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
								name="acceptTerms"
								defaultValue={false}
								render={({ field }) => (
									<FormItem className="flex flex-col items-start space-x-3 space-y-0">
										<FormControl>
											<div className="flex items-center gap-[10px]">
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
													id="acceptTerms"
													className="h-[18px] w-[18px] border-primary-black-dark rounded text-primary-black-dark"
												/>
												<div className="space-y-1 leading-none">
													<FormLabel
														className="auth-input__label"
														htmlFor="acceptTerms"
													>
														I agree with the terms
														and condistions
													</FormLabel>
												</div>
											</div>
										</FormControl>
										<FormMessage className="form__error block pt-[10px] !ml-0" />
									</FormItem>
								)}
							/>
							<div className="auth-input__group">
								<Button
									className="auth-form__btn gap-[5px]"
									disabled={isPending}
								>
									{isPending ? (
										<div className="flex items-center gap-[5px]">
											<ButtonLoader
												className={
													'h-[16px] w-[16px] stroke-white'
												}
											/>
											Submitting
										</div>
									) : (
										'Submit'
									)}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectInterest;
