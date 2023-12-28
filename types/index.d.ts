// AUTH types
interface RegisterUser {
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
}
interface LoginUser {
	email: string;
	password: string;
	remember: boolean;
}
interface ITokenOptions {
	expires: Date;
	maxAge: number;
	httpOnly: boolean;
	sameSite: 'lax' | 'strict' | 'none' | undefined;
	secure?: boolean;
}

// FILE types
interface FileType {
	title: string;
	id: string;
	url: string;
	fileType: string;
	fileName: string;
	description: string | null;
}

interface CategoryType {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	thumbnail: FileType | null;
	projects:
		| {
				id: string;
		  }[]
		| null;
	createdAt: Date;
}
interface UpdateCategory {
	id: string;
	name: string;
	description: string | null;
	thumbnail: FileType | null;
}

// Project Types
type ProjectStatus =
	| 'COMPLETED'
	| 'CANCELED'
	| 'ACTIVE'
	| 'DRAFT'
	| 'CLOSED'
	| 'PRIVATE';

interface DocumentType {
	name: string;
	status: string;
	description: string | null;
	file: FileType;
}
interface ProjectType {
	name: string;
	location: string;
	description: string | any;
	thumbnail: FileType[] | [];
	gallery: FileType[] | [];
	status: ProjectStatus;
	category: string;
	minInvestment: number;
	capex: number;
	targetAmount: number;
	totalRevenue: number;
	totalCost: number;
	roi: number;
	closeDate: Date;
	documents: DocumentType[] | [];
}
interface ProjectAdminTable {
	id: string;
	name: string;
	slug: string;
	thumbnail: {
		url: string;
	} | null;
	category: {
		name: string;
	} | null;
	status: ProjectStatus;
	createdAt: Date;
}
