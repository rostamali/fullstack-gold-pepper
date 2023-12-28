'use client';
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
import { ProjectFormSchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import CategorySelect from '@/components/select/CategorySelect';
import SelectList from '@/components/select/SelectList';
import { DocumentsStatus, ProjectStatus } from '@/constants';
import ButtonLoader from '../shared/Spinners/ButtonLoader';
import ThumbnailSelect from './ThumbnailSelect';
import { Textarea } from '../ui/textarea';
import { FiPlus } from 'react-icons/fi';
import Documents from './Documents';
import DocumentSelect from './DocumentSelect';
import toast from 'react-hot-toast';
import {
	createProjectByAdmin,
	updateProjectByAdmin,
} from '@/lib/actions/project.action';
import DatePicker from './DatePicker';
import { useRouter } from 'next/navigation';
import GallerySelect from './GallerySelect';
type ProjectForm = {
	type: 'edit' | 'create';
	defaultValues: z.infer<typeof ProjectFormSchema> | null;
	project_id: string | null;
};

const ProjectForm: React.FC<ProjectForm> = ({
	type,
	defaultValues,
	project_id,
}) => {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof ProjectFormSchema>>({
		resolver: zodResolver(ProjectFormSchema),
		defaultValues: defaultValues
			? {
					...defaultValues,
			  }
			: {},
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'documents',
	});
	const addDocumentFields = (field: number) => {
		append(
			{
				name: `Attached file no: ${field + 1}`,
				description: '',
				status: 'PRIVATE',
				file: [],
			},
			{ shouldFocus: true },
		);
	};

	const handleProjectSubmit = async (
		data: z.infer<typeof ProjectFormSchema>,
	) => {
		setIsPending(true);
		if (type === 'create') {
			try {
				const result = await createProjectByAdmin(
					JSON.parse(JSON.stringify(data as ProjectType)),
				);
				setIsPending(false);
				if (result.success) {
					toast.success(result.message);
					router.push(`/admin/project/edit?project_id=${result.id}`, {
						scroll: true,
					});
				} else {
					toast.error(result.message);
				}
			} catch (error: any) {
				toast.error(error.message);
				setIsPending(false);
			}
		} else {
			try {
				if (project_id) {
					const result = await updateProjectByAdmin(
						JSON.parse(JSON.stringify(data as ProjectType)),
						project_id,
					);
					setIsPending(false);
					if (result.success) {
						toast.success(result.message);
					} else {
						toast.error(result.message);
					}
				} else {
					toast.error(`Project ID not found`);
					setIsPending(false);
				}
			} catch (error: any) {
				toast.error(error.message);
				setIsPending(false);
			}
		}
	};

	return (
		<Form {...form}>
			<form
				className="auth-form__input-space"
				onSubmit={form.handleSubmit(handleProjectSubmit)}
			>
				<div className="grid lg:grid-cols-12 grid-cols-1 gap-[40px]">
					<div className="lg:col-span-8 admin-form__space">
						<div className="admin-form__space">
							<FormField
								control={form.control}
								name="name"
								defaultValue=""
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											Project Name
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="location"
								defaultValue=""
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											Project Location/Area
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[25px]">
							<FormField
								control={form.control}
								name="minInvestment"
								defaultValue={1}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											Min Invest Amount
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="capex"
								defaultValue={0}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											Capex Required
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="totalRevenue"
								defaultValue={0}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											Total Revenue
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="totalCost"
								defaultValue={0}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											Total Cost
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="roi"
								defaultValue={0}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											ROI
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="targetAmount"
								defaultValue={0}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="input-label-md">
											Target Amount
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												className="input-field-md"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form__error" />
									</FormItem>
								)}
							/>
						</div>
						<div className="project-documents">
							<div className="flex items-center justify-between gap-[15px]">
								<h4 className="input-label-md">Documents</h4>
								<button
									className="text-primary-black-light text-opacity-60 font-medium text-[15px] flex items-center gap-[6px]"
									type="button"
									onClick={() =>
										addDocumentFields(fields.length)
									}
								>
									<FiPlus />
									<span>Add File</span>
								</button>
							</div>
							<div className="documents mt-[25px] flex flex-col gap-[15px]">
								{fields.map((field, index) => (
									<Documents
										key={index}
										title={form.watch(
											`documents.${index}.name`,
										)}
										fields={
											<div className="grid grid-cols-2 gap-[20px] relative">
												<FormField
													control={form.control}
													name={`documents.${index}.name`}
													defaultValue=""
													render={({ field }) => (
														<FormItem>
															<FormLabel className="auth-input__label">
																Name
															</FormLabel>
															<FormControl>
																<Input
																	type="text"
																	className="input-field-md"
																	{...field}
																/>
															</FormControl>
															<FormMessage className="form__error" />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`documents.${index}.status`}
													defaultValue=""
													render={({ field }) => (
														<FormItem>
															<FormLabel className="auth-input__label">
																Status
															</FormLabel>
															<FormControl>
																<SelectList
																	triggerClass={
																		'bg-white border border-admin-gray-dark border-opacity-70 text-primary-black-light text-opacity-60 h-[48px]'
																	}
																	placeholder={
																		'Select status'
																	}
																	contentClass={
																		'bg-white'
																	}
																	defaultValue={
																		field.value
																	}
																	options={
																		DocumentsStatus
																	}
																	onValueChange={(
																		val,
																	) => {
																		form.setValue(
																			`documents.${index}.status`,
																			val,
																		),
																			form.clearErrors(
																				'status',
																			);
																	}}
																/>
															</FormControl>
															<FormMessage className="form__error" />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`documents.${index}.file`}
													defaultValue={[]}
													render={({ field }) => (
														<FormItem>
															<FormLabel className="input-label-md">
																Status
															</FormLabel>
															<FormControl>
																<DocumentSelect
																	onFileChange={(
																		val,
																	) => {
																		form.setValue(
																			`documents.${index}.file`,
																			val,
																		),
																			form.clearErrors(
																				`documents.${index}.file`,
																			);
																	}}
																	defaultDocument={
																		field
																			? field.value
																			: []
																	}
																/>
															</FormControl>
															<FormMessage className="form__error" />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`documents.${index}.description`}
													defaultValue=""
													render={({ field }) => (
														<FormItem>
															<FormLabel className="auth-input__label">
																Description
															</FormLabel>
															<FormControl>
																<Textarea
																	className="input-field-md !h-[100px]"
																	{...field}
																/>
															</FormControl>
															<FormMessage className="form__error" />
														</FormItem>
													)}
												/>
												<Button
													type="button"
													className="bg-primary-orange-dark bg-opacity-10 text-primary-orange-dark absolute right-0 -top-[7px] p-0 h-[30px] px-[10px] text-[14px] font-normal"
													onClick={() =>
														remove(index)
													}
												>
													Delete
												</Button>
											</div>
										}
									/>
								))}
							</div>
						</div>
						<FormField
							control={form.control}
							name="description"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel className="input-label-md">
										Description
									</FormLabel>
									<FormControl>
										<Textarea
											className="input-field-md !h-[450px]"
											{...field}
										/>
									</FormControl>
									<FormMessage className="form__error" />
								</FormItem>
							)}
						/>
					</div>
					<div className="lg:col-span-4 admin-form__space">
						<FormField
							control={form.control}
							name="status"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel className="input-label-md">
										Status
									</FormLabel>
									<FormControl>
										<SelectList
											triggerClass={
												'bg-white border border-admin-gray-dark border-opacity-70 text-primary-black-light text-opacity-60 h-[48px]'
											}
											placeholder={'Select status'}
											contentClass={'bg-white'}
											defaultValue={field.value}
											options={ProjectStatus}
											onValueChange={(val) => {
												form.setValue('status', val),
													form.clearErrors('status');
											}}
										/>
									</FormControl>
									<FormMessage className="form__error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="category"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel className="input-label-md">
										Category/Industry
									</FormLabel>
									<FormControl>
										<div>
											<CategorySelect
												onChange={(val) => {
													form.setValue(
														'category',
														val,
													),
														form.clearErrors(
															'category',
														);
												}}
												placeholder={
													'Select category...'
												}
												defaultValue={
													field.value
														? field.value
														: ''
												}
												contentClass="!w-full bg-white"
												triggerClass="bg-white border border-admin-gray-dark border-opacity-70 text-primary-black-light text-opacity-60 h-[48px] w-full"
											/>
										</div>
									</FormControl>
									<FormMessage className="form__error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="closeDate"
							defaultValue={new Date()}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="input-label-md">
										Close Date
									</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(val) => {
												form.setValue(
													'closeDate',
													val as Date,
												);
												form.clearErrors('closeDate');
											}}
											triggerClass={
												'bg-white border border-admin-gray-dark border-opacity-70 text-primary-black-light text-opacity-60 h-[48px]'
											}
											defaultValue={field.value}
										/>
									</FormControl>
									<FormMessage className="form__error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="thumbnail"
							defaultValue={[]}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="input-label-md">
										Status
									</FormLabel>
									<FormControl>
										<ThumbnailSelect
											onFileChange={(val) => {
												form.setValue('thumbnail', val),
													form.clearErrors(
														'thumbnail',
													);
											}}
											defaultThumbnail={
												field ? field.value : []
											}
										/>
									</FormControl>
									<FormMessage className="form__error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="gallery"
							defaultValue={[]}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="input-label-md">
										Status
									</FormLabel>
									<FormControl>
										<GallerySelect
											onFileChange={(val) => {
												form.setValue('gallery', val),
													form.clearErrors('gallery');
											}}
											defaultThumbnail={
												field ? field.value : []
											}
										/>
									</FormControl>
									<FormMessage className="form__error" />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className="flex justify-end">
					<Button
						className="btn-primary !text-[16px] !h-[50px] !px-[30px] gap-[5px]"
						disabled={isPending}
					>
						<>
							{isPending && (
								<ButtonLoader
									className={'h-[16px] w-[16px] stroke-white'}
								/>
							)}
							{type === 'create'
								? 'Create Project'
								: 'Save Update'}
						</>
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default ProjectForm;
