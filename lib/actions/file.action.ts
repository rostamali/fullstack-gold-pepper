'use server';
import { join } from 'path';
import { handleResponse } from '../helper/serverResponse';
import { unlink, writeFile } from 'fs/promises';
import { prisma } from '../prisma';
import { fileSizeFormat } from '../utils';
import { revalidatePath } from 'next/cache';
import { isAuthenticatedAdmin } from './auth.action';

export const uploadFilesByAdmin = async (formData: FormData) => {
	try {
		const files: File[] | null = formData.getAll(
			'files',
		) as unknown as File[];
		if (!files || files.length === 0) {
			return handleResponse(false, 'No files uploaded');
		}

		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const buffer = Buffer.from(await file.arrayBuffer());
			const fileName = `upload-${Date.now()}-${
				Math.random() * (999 - 1) + 1
			}.${file.type.split('/')[1]}`;

			const uploadPath = join('./public/files', 'uploads/', fileName);
			await writeFile(uploadPath, buffer);
			const filesize = fileSizeFormat(file.size);

			await prisma.file.create({
				data: {
					fileType: file.type.split('/')[0],
					fileName: fileName,
					title: file.name,
					url: fileName,
					size: filesize,
					author: {
						connect: {
							id: isAdmin.id,
						},
					},
				},
			});
		}
		revalidatePath('/admin/files', 'page');

		return handleResponse(true, 'File uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'No file uploaded');
	}
};
export const fetchFilesByAdmin = async (params: {
	pageSize: number;
	page: number;
	type: string | null;
	query: string | null;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const { page = 1, pageSize = 10, type, query } = params;
		const files = await prisma.file.findMany({
			where: {
				...(query && {
					OR: [
						{ title: { contains: query } },
						{ description: { contains: query } },
					],
				}),
				...(type && type !== 'all' && { fileType: { contains: type } }),
			},
			select: {
				id: true,
				fileName: true,
				title: true,
				url: true,
				fileType: true,
				description: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countFiles = await prisma.file.count({});

		return {
			files,
			pages: Math.ceil(countFiles / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchFilesOnModal = async (params: {
	type: string;
	page: number;
	pageSize: number;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const { type = 'all', page = 1, pageSize } = params;
		const files = await prisma.file.findMany({
			where: {
				...(type && type !== 'all' && { fileType: { contains: type } }),
			},
			select: {
				id: true,
				title: true,
				url: true,
				fileType: true,
			},
			take: page * pageSize,
			orderBy: {
				createdAt: 'desc',
			},
		});

		const totalFiles = await prisma.file.count({
			where: {
				...(type && type !== 'all' && { fileType: { contains: type } }),
			},
		});
		const isNext = totalFiles > files?.length;

		return {
			files,
			isNext,
			totalFiles,
		};
	} catch (error) {
		return;
	}
};
export const updateFilesByAdmin = async (params: {
	title: string;
	description: string | null;
	id: string;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const { title, description, id } = params;
		const fileExist = await prisma.file.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
			},
		});
		if (!fileExist) return handleResponse(false, 'File does not exist');

		await prisma.file.update({
			where: {
				id,
			},
			data: {
				title,
				description,
			},
		});
		revalidatePath('/admin/files', 'page');

		return handleResponse(true, 'File updated successfully');
	} catch (error) {
		return handleResponse(false, 'File update failed');
	}
};
export const deleteFilesByAdmin = async (params: { fileId: string[] }) => {
	try {
		const { fileId } = params;
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const filesToDelete = await prisma.file.findMany({
			where: {
				id: { in: fileId },
			},
			select: {
				id: true,
				fileName: true,
			},
		});
		if (!filesToDelete.length)
			return handleResponse(false, `File does not exist`);

		for (const file of filesToDelete) {
			const filePath = join('./public/files', 'uploads/', file.fileName);
			try {
				await unlink(filePath);
				await prisma.file.delete({
					where: {
						id: file.id,
					},
				});
			} catch (error) {
				return handleResponse(
					false,
					`Error deleting file: ${filePath}`,
				);
			}
		}

		revalidatePath('/admin/files', 'page');
		return handleResponse(true, 'File deleted successfully');
	} catch (error) {
		return handleResponse(false, 'File deletion failed');
	}
};
