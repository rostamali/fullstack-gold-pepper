'use client';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ButtonLoader from '../Spinners/ButtonLoader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectCategorySchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import SelectFiles from '../Modal/SelectFiles';
import Image from 'next/image';
import Placeholder from '../Cards/Placeholder';
import { createCategoryByAdmin } from '@/lib/actions/category.action';
import toast from 'react-hot-toast';

const CreateCategory = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ProjectCategorySchema>>({
		resolver: zodResolver(ProjectCategorySchema),
		defaultValues: {
			thumbnail: [],
		},
	});

	const handleCreateCategory = async (
		data: z.infer<typeof ProjectCategorySchema>,
	) => {
		setIsPending(true);
		try {
			const result = await createCategoryByAdmin(data);
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
		<Form {...form}>
			<form
				className="flex flex-col gap-[25px]"
				onSubmit={form.handleSubmit(handleCreateCategory)}
			>
				<div className="flex flex-col items-start">
					{form.watch('thumbnail') ? (
						form.watch('thumbnail').length > 0 ? (
							<Image
								src={`/files/uploads/${
									form.watch('thumbnail')[0].url
								}`}
								alt={form.watch('thumbnail')[0].title}
								width={120}
								height={120}
								className="h-[80px] w-[80px] rounded-md object-cover border border-admin-gray-dark"
							/>
						) : (
							<Placeholder
								containerClass={'h-[80px] w-[80px]'}
								iconClass={''}
							/>
						)
					) : (
						<Placeholder
							containerClass={'text-[30px]'}
							iconClass={''}
						/>
					)}
					<div className="flex items-center gap-[10px]">
						<SelectFiles
							onInsertFiles={(file) =>
								form.setValue('thumbnail', file)
							}
							trigger={
								<Button
									type="button"
									className="p-0 text-primary-orange-dark"
								>
									Select File
								</Button>
							}
							modalTitle={'Category Thumbnail'}
							selectType={'thumbnail'}
							defaultFile={form.watch('thumbnail')}
						/>
						{form.watch('thumbnail') &&
							form.watch('thumbnail').length > 0 && (
								<Button
									type="button"
									className="p-0 text-primary-black-light underline"
									onClick={() =>
										form.setValue('thumbnail', [])
									}
								>
									Remove
								</Button>
							)}
					</div>
				</div>
				<FormField
					control={form.control}
					name="name"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label">
								Name
							</FormLabel>
							<FormControl>
								<>
									<Input
										type="text"
										className="auth-input__field"
										{...field}
									/>
								</>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label">
								Description
							</FormLabel>
							<FormControl>
								<Textarea
									className="auth-input__field"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>
				<div className="auth-input__group">
					<Button
						className="auth-form__btn gap-[5px]"
						disabled={isPending}
					>
						<>
							{isPending && (
								<ButtonLoader
									className={'h-[16px] w-[16px] stroke-white'}
								/>
							)}
							Create Now
						</>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default CreateCategory;
