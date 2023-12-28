import { Button } from '@/components/ui/button';
import { ProjectCategorySchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ButtonLoader from '../Spinners/ButtonLoader';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateCategoryByAdmin } from '@/lib/actions/category.action';
import toast from 'react-hot-toast';
import ThumbnailSelect from '@/components/ProjectForm/ThumbnailSelect';
type UpdateFormProps = {
	data: UpdateCategory | null;
};

const UpdateCategory: React.FC<UpdateFormProps> = ({ data }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ProjectCategorySchema>>({
		resolver: zodResolver(ProjectCategorySchema),
		defaultValues: {
			name: data ? data.name : '',
			description: data ? (data.description ? data.description : '') : '',
			thumbnail: data ? (data.thumbnail ? [data.thumbnail] : []) : [],
		},
	});
	const handleUpdateCategory = async (
		updateValue: z.infer<typeof ProjectCategorySchema>,
	) => {
		setIsPending(true);
		try {
			if (data) {
				const result = await updateCategoryByAdmin({
					id: data.id,
					name: updateValue.name,
					description: updateValue.description,
					thumbnail: updateValue.thumbnail,
				});
				setIsPending(false);
				if (result.success) {
					toast.success(result.message);
				} else {
					toast.error(result.message);
				}
			} else {
				toast.error('Invalid category ID');
				setIsPending(false);
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
				onSubmit={form.handleSubmit(handleUpdateCategory)}
			>
				<div className="grid md:grid-cols-4 grid-cols-1 gap-[25px]">
					<div className="lg:col-span-1 md:col-span-2 flex flex-col items-start">
						<div className="flex items-center gap-[10px] w-full">
							<FormField
								control={form.control}
								name="thumbnail"
								defaultValue={[]}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="auth-input__label">
											Name
										</FormLabel>
										<FormControl>
											<ThumbnailSelect
												onFileChange={(val) => {
													form.setValue(
														'thumbnail',
														val,
													);
												}}
												defaultThumbnail={field.value}
												frameClass={'h-[170px]'}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="lg:col-span-3 md:col-span-2 flex flex-col gap-[20px]">
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
						<div className="flex justify-end">
							<Button
								className="btn-primary gap-[5px]"
								disabled={isPending}
							>
								<>
									{isPending && (
										<ButtonLoader
											className={
												'h-[16px] w-[16px] stroke-white'
											}
										/>
									)}
									Update Now
								</>
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default UpdateCategory;
