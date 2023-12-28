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
import { createCategoryByAdmin } from '@/lib/actions/category.action';
import toast from 'react-hot-toast';
import ThumbnailSelect from '@/components/ProjectForm/ThumbnailSelect';

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
			<form onSubmit={form.handleSubmit(handleCreateCategory)}>
				<div className="grid sm:grid-cols-2 grid-cols-1 gap-[25px]">
					<FormField
						control={form.control}
						name="thumbnail"
						defaultValue={[]}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Name
								</FormLabel>
								<FormControl>
									<ThumbnailSelect
										onFileChange={(val) => {
											form.setValue('thumbnail', val);
										}}
										defaultThumbnail={field.value}
										frameClass={'h-[177px]'}
									/>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
					<div className="flex flex-col gap-[25px]">
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
					</div>
				</div>
				<div className="flex justify-end mt-[25px]">
					<Button
						className="btn-primary w-full gap-[3px]"
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
