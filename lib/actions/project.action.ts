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
				...(params.documents &&
					params.documents.length > 0 && {
						documents: {
							create: params.documents.map((doc) => ({
								name: doc.name,
								description: doc.description,
								status: doc.status,
								file: {
									connect: { id: doc.file[0].id },
								},
							})),
						},
					}),
				...(params.gallery &&
					params.gallery.length > 0 && {
						gallery: {
							create: {
								files: {
									connect: params.gallery.map((file) => ({
										id: file.id,
									})),
								},
							},
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
						title: true,
						url: true,
						fileType: true,
					},
				},
				documents: {
					select: {
						id: true,
						name: true,
						description: true,
						status: true,
						file: {
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
				},
				gallery: {
					select: {
						files: {
							select: {
								id: true,
								title: true,
								url: true,
								fileType: true,
							},
						},
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
export const fetchProjectsByUser = async (params: {
	pageSize: number;
	page: number;
	query: string | null;
}) => {
	try {
		const { page = 1, pageSize = 10, query } = params;
		const projects = await prisma.project.findMany({
			where: {
				status: 'ACTIVE',
				isActive: true,
				...(query && {
					OR: [{ name: { contains: query } }],
				}),
			},
			select: {
				name: true,
				slug: true,
				targetAmount: true,
				capex: true,
				roi: true,
				closeDate: true,
				category: {
					select: {
						name: true,
					},
				},
				thumbnail: {
					select: {
						url: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countFiles = await prisma.file.count({});

		return {
			projects,
			pages: Math.ceil(countFiles / pageSize),
		};
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
				...(params.documents &&
					params.documents.length > 0 && {
						documents: {
							deleteMany: {},
							create: params.documents.map((doc) => ({
								name: doc.name,
								description: doc.description,
								status: doc.status,
								file: {
									connect: { id: doc.file[0].id },
								},
							})),
						},
					}),
				...(params.documents &&
					params.documents.length === 0 && {
						documents: {
							deleteMany: {},
						},
					}),
				...(params.category &&
					params.category.length > 0 && {
						category: {
							connect: { id: catExist?.id },
						},
					}),
				...(params.gallery &&
					params.gallery.length > 0 && {
						gallery: {
							upsert: {
								create: {
									files: {
										connect: params.gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
								update: {
									files: {
										set: params.gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
							},
						},
					}),
				...(params.gallery &&
					params.gallery.length === 0 && {
						gallery: {
							upsert: {
								update: {
									files: {
										set: params.gallery.map((file) => ({
											id: file.id,
										})),
									},
								},
								create: {},
							},
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
export const deleteProjectByAdmin = async (params: { projectId: string[] }) => {
	try {
		const { projectId } = params;
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return handleResponse(false, `You don't have a permission`);

		const projectToDelete = await prisma.project.findMany({
			where: {
				id: { in: projectId },
			},
			select: {
				id: true,
			},
		});
		if (!projectToDelete.length)
			return handleResponse(false, `Project does not exist`);

		for (const project of projectToDelete) {
			await prisma.project.delete({
				where: {
					id: project.id,
				},
			});
		}

		revalidatePath('/admin/project', 'page');

		return handleResponse(true, 'Project deleted successfully');
	} catch (error) {
		return handleResponse(false, 'Project deletetion failed');
	}
};
export const importProjectFromCSV = async (params: CSVProject[]) => {
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

			let projectExist = await prisma.project.findFirst({
				where: {
					slug,
				},
				select: {
					id: true,
					slug: true,
				},
			});
			while (projectExist) {
				modifiedSlug = `${slug}-${counter}`;
				counter++;
				projectExist = await prisma.project.findFirst({
					where: {
						slug: modifiedSlug,
					},
					select: {
						id: true,
						slug: true,
					},
				});
			}
			await prisma.project.create({
				data: {
					name: single.name,
					slug: modifiedSlug,
					location: single.location,
					minInvestment: Number(single.miniInvestment),
					capex: Number(single.capex),
					totalRevenue: Number(single.totalRevenue),
					totalCost: Number(single.totalCost),
					roi: Number(single.roi),
					targetAmount: Number(single.targetAmount),
					status: single.status,
					closeDate: new Date(),
					author: {
						connect: { id: isAdmin.id },
					},
				},
			});
		}

		revalidatePath('/admin/project', 'page');

		return handleResponse(true, 'Project uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'CSV upload failed');
	}
};
