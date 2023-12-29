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
interface SelectFileType {
	id: string;
	title: string;
	url: string;
	fileType: string;
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
type DocumentStatus = 'PRIVATE' | 'PUBLIC';
type ProjectStatus =
	| 'COMPLETED'
	| 'CANCELED'
	| 'ACTIVE'
	| 'DRAFT'
	| 'CLOSED'
	| 'PRIVATE';

interface DocumentType {
	name: string;
	status: DocumentStatus;
	description: string | null;
	file: SelectFileType[];
}
interface ProjectType {
	name: string;
	location: string;
	description: string | any;
	thumbnail: SelectFileType[] | [];
	gallery: SelectFileType[] | [];
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

interface CSVProject {
	name: string;
	location: string;
	miniInvestment: number;
	capex: number;
	totalRevenue: number;
	totalCost: number;
	roi: number;
	targetAmount: number;
	status: ProjectStatus;
}
interface CSVCategory {
	name: string;
	description: string;
}
