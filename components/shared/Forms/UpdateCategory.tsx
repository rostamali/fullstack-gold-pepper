import { Button } from '@/components/ui/button';
import { ProjectCategorySchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ButtonLoader from '../Spinners/ButtonLoader';
import Image from 'next/image';
import Placeholder from '../Cards/Placeholder';
import SelectFiles from '../Modal/SelectFiles';
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
						{form.watch('thumbnail') ? (
							form.watch('thumbnail').length > 0 ? (
								<Image
									src={`/files/uploads/${
										form.watch('thumbnail')[0].url
									}`}
									alt={form.watch('thumbnail')[0].title}
									width={500}
									height={500}
									className="md:h-[200px] h-[250px] w-[100%] rounded-md object-cover border border-admin-gray-dark"
								/>
							) : (
								<Placeholder
									containerClass={
										'md:h-[200px] h-[250px] w-[100%]'
									}
									iconClass={'md:text-[40px] text-[80px]'}
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
