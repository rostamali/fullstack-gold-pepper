import ButtonLoader from '@/components/shared/Spinners/ButtonLoader';
import { Button } from '@/components/ui/button';
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
import { updateFilesByAdmin } from '@/lib/actions/file.action';
import { FileUpdateSchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
type FileUpdateProps = {
	fileDetails: FileType;
};

const FileUpdate: React.FC<FileUpdateProps> = ({ fileDetails }) => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof FileUpdateSchema>>({
		resolver: zodResolver(FileUpdateSchema),
		defaultValues: {
			title: fileDetails ? fileDetails.title : '',
			description: fileDetails
				? fileDetails.description
					? fileDetails.description
					: ''
				: '',
		},
	});

	const handleRegisterUser = async (
		data: z.infer<typeof FileUpdateSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await updateFilesByAdmin({
				...data,
				id: fileDetails.id,
			});
			setIsPending(false);
			if (result.success) {
				toast.success(result.message);
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
				className="flex flex-col gap-[15px]"
				onSubmit={form.handleSubmit(handleRegisterUser)}
			>
				<FormField
					control={form.control}
					name="title"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label">
								File name
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
							Save Now
						</>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default FileUpdate;
