'use server';
import { createSlug } from '../utils';
import { prisma } from '../prisma';
import { isAuthenticatedAdmin } from './auth.action';
import { handleResponse } from '../helper/serverResponse';
import { revalidatePath } from 'next/cache';
import { ProjectStatus } from '@prisma/client';

export const createProjectByAdmin = async (params: ProjectType) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return {
				success: true,
				id: null,
				message: `You don't have permission`,
			};

		const newProject = {
			name: params.name,
			location: params.location,
			description: params.description,
			status: params.status,
			minInvestment: params.minInvestment,
			capex: params.capex,
			targetAmount: params.targetAmount,
			totalRevenue: params.totalRevenue,
			totalCost: params.totalCost,
			roi: params.roi,
			closeDate: params.closeDate,
		};
		const slug = await createSlug(newProject.name);
		const catExist = await prisma.category.findFirst({
			where: {
				slug: params.category,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		const projectExist = await prisma.project.findFirst({
			where: {
				slug,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (projectExist)
			return {
				success: false,
				id: null,
				message: 'Project already exists',
			};

		const createdProject = await prisma.project.create({
			data: {
				...newProject,
				slug,
				author: {
					connect: { id: isAdmin.id },
				},
				...(params.thumbnail &&
					params.thumbnail.length > 0 && {
						thumbnail: {
							connect: { id: params.thumbnail[0].id },
						},
					}),
				...(params.category &&
					params.category.length > 0 && {
						category: {
							connect: { id: catExist?.id },
						},
					}),
			},
			select: {
				id: true,
			},
		});
		return {
			success: true,
			id: createdProject.id,
			message: 'Project created successfully',
		};
	} catch (error) {
		return {
			success: false,
			id: null,
			message: 'Oops! something went wrong',
		};
	}
};
export const fetchProjectDetailsById = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const project = await prisma.project.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				name: true,
				location: true,
				minInvestment: true,
				capex: true,
				totalRevenue: true,
				totalCost: true,
				roi: true,
				targetAmount: true,
				status: true,
				description: true,
				closeDate: true,
				category: {
					select: {
						id: true,
						slug: true,
						name: true,
					},
				},
				thumbnail: {
					select: {
						id: true,
						fileName: true,
						title: true,
						url: true,
						fileType: true,
						description: true,
					},
				},
			},
		});
		if (!project) return;

		return project;
	} catch (error) {
		return;
	}
};
export const updateProjectByAdmin = async (params: ProjectType, id: string) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return handleResponse(false, `You don't have permission`);

		const updateProject = {
			name: params.name,
			location: params.location,
			description: params.description,
			status: params.status,
			minInvestment: params.minInvestment,
			capex: params.capex,
			targetAmount: params.targetAmount,
			totalRevenue: params.totalRevenue,
			totalCost: params.totalCost,
			roi: params.roi,
			closeDate: params.closeDate,
		};
		const slug = await createSlug(updateProject.name);
		const catExist = await prisma.category.findFirst({
			where: {
				slug: params.category,
			},
			select: {
				id: true,
				slug: true,
			},
		});
		const slugExist = await prisma.project.findFirst({
			where: {
				slug,
				NOT: {
					id,
				},
			},
			select: {
				id: true,
				slug: true,
			},
		});
		if (slugExist)
			return handleResponse(false, 'Use different project name');

		await prisma.project.update({
			where: { id },
			data: {
				...updateProject,
				...(params.thumbnail &&
					params.thumbnail.length > 0 && {
						thumbnail: {
							connect: { id: params.thumbnail[0].id },
						},
					}),
				...(params.category &&
					params.category.length > 0 && {
						category: {
							connect: { id: catExist?.id },
						},
					}),
			},
		});
		revalidatePath('/admin/project/edit', 'page');

		return handleResponse(true, 'Project updated successfully');
	} catch (error) {
		return handleResponse(false, 'Project update failed. Try again');
	}
};
export const fetchProjectsByAdmin = async (params: {
	pageSize: number;
	page: number;
	status: ProjectStatus | null;
	query: string | null;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const { page = 1, pageSize = 10, status, query } = params;
		const projects = await prisma.project.findMany({
			where: {
				...(query && {
					OR: [
						{ name: { contains: query } },
						{
							description: {
								contains: query,
							},
						},
					],
				}),
				...(status && {
					status: { equals: status },
				}),
				isActive: true,
			},
			select: {
				id: true,
				name: true,
				slug: true,
				thumbnail: {
					select: {
						url: true,
					},
				},
				createdAt: true,
				status: true,
				category: {
					select: {
						name: true,
					},
				},
			},
		});
		return projects;
	} catch (error) {
		return;
	}
};
export const handleDeleteProjectByAdmin = async (params: {
	projectId: string[];
}) => {
	try {
		const { projectId } = params;
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const categoryToDelete = await prisma.project.findMany({
			where: {
				id: { in: projectId },
			},
			select: {
				id: true,
			},
		});
		if (!categoryToDelete.length)
			return handleResponse(false, `Project does not exist`);

		await prisma.project.deleteMany({
			where: {
				id: { in: projectId },
			},
		});

		revalidatePath('/admin/project', 'page');

		return handleResponse(true, 'Project deleted successfully');
	} catch (error) {
		return handleResponse(false, 'Project deletetion failed');
	}
};
