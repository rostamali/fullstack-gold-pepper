'use server';

import { handleResponse } from '../helper/serverResponse';
import { createSlug } from '../utils';
import { prisma } from '../prisma';
import { isAuthenticatedAdmin } from './auth.action';
import { revalidatePath } from 'next/cache';
import Papa from 'papaparse';

export const createCategoryByAdmin = async (params: {
	name: string;
	description: string | null;
	thumbnail: SelectFileType[] | [];
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return handleResponse(false, `You don't have permission`);

		const { name, description, thumbnail } = params;
		const slug = await createSlug(name);
		const newCategory = {
			name,
			slug,
			description,
		};

		const categoryExist = await prisma.category.findFirst({
			where: {
				slug: newCategory.slug,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (categoryExist)
			return handleResponse(false, 'Category already exist');

		await prisma.category.create({
			data: {
				name: newCategory.name,
				slug: newCategory.slug,
				description: newCategory.description,
				...(thumbnail.length > 0 && {
					thumbnail: {
						connect: {
							id: thumbnail[0].id,
						},
					},
				}),
			},
		});

		revalidatePath('/admin/project/categories', 'page');
		return handleResponse(true, 'Category created successfully');
	} catch (error) {
		return handleResponse(false, 'Oops! Please try again');
	}
};
export const fetchCategoryByAdmin = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
		const { page = 1, pageSize = 10, query } = params;

		const files = await prisma.category.findMany({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ description: { contains: query } },
					],
				}),
			},
			select: {
				id: true,
				name: true,
				slug: true,
				description: true,
				thumbnail: {
					select: {
						id: true,
						url: true,
						title: true,
						fileType: true,
						fileName: true,
						description: true,
					},
				},
				createdAt: true,
				projects: {
					select: {
						id: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countFiles = await prisma.category.count({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{ description: { contains: query } },
					],
				}),
			},
		});

		return {
			files,
			pages: Math.ceil(countFiles / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const deleteCategoryByAdmin = async (params: {
	categoryId: string[];
}) => {
	try {
		const { categoryId } = params;
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const categoryToDelete = await prisma.category.findMany({
			where: {
				id: { in: categoryId },
			},
			select: {
				id: true,
			},
		});
		if (!categoryToDelete.length)
			return handleResponse(false, `Category does not exist`);

		await prisma.category.deleteMany({
			where: {
				id: { in: categoryId },
			},
		});

		revalidatePath('/admin/project/categories', 'page');
		return handleResponse(true, 'Category deleted successfully');
	} catch (error) {
		return handleResponse(false, 'Category deletion failed');
	}
};
export const updateCategoryByAdmin = async (params: {
	id: string;
	name: string;
	description: string | null;
	thumbnail: SelectFileType[] | [];
}) => {
	try {
		const { id, name, description, thumbnail } = params;
		const categoryExist = await prisma.category.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
			},
		});
		if (!categoryExist)
			return handleResponse(false, `Category doesn't exist`);

		const slug = await createSlug(name);
		const slugExist = await prisma.category.findFirst({
			where: {
				slug,
				id: {
					not: id,
				},
			},
			select: {
				id: true,
			},
		});
		if (slugExist)
			return handleResponse(false, `Category name already exist`);

		await prisma.category.update({
			where: {
				id,
			},
			data: {
				slug,
				name,
				description,
				...(thumbnail.length > 0 && {
					thumbnail: {
						connect: {
							id: thumbnail[0].id,
						},
					},
				}),
			},
		});

		revalidatePath('/admin/project/categories', 'page');
		return handleResponse(true, 'Category updated successfully');
	} catch (error) {
		return handleResponse(false, 'Oops! Category update failed');
	}
};
export const fetchCategoryList = async () => {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return {
			categories,
		};
	} catch (error) {
		return;
	}
};
export const importCategoryFromCSV = async (params: CSVCategory[]) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return {
				success: true,
				id: null,
				message: `You don't have permission`,
			};

		for (const single of params) {
			const slug = await createSlug(single.name);
			let modifiedSlug = slug;
			let counter = 1;

			let catExist = await prisma.category.findFirst({
				where: {
					slug,
				},
				select: {
					id: true,
					slug: true,
				},
			});
			while (catExist) {
				modifiedSlug = `${slug}-${counter}`;
				counter++;
				catExist = await prisma.category.findFirst({
					where: {
						slug: modifiedSlug,
					},
					select: {
						id: true,
						slug: true,
					},
				});
			}
			await prisma.category.create({
				data: {
					name: single.name,
					slug: modifiedSlug,
					description: single.description,
				},
			});
		}

		revalidatePath('/admin/project/categories', 'page');

		return handleResponse(true, 'Categories uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'CSV upload failed');
	}
};
export const exportCategoryToCSV = async () => {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				description: true,
			},
		});
		return Papa.unparse(categories, {
			header: true,
			skipEmptyLines: true,
		});
	} catch (error) {
		console.log(error);
		return;
	}
};
