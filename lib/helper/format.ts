export const ProjectStatusFormat: Record<ProjectStatus, string> = {
	COMPLETED: `Completed`,
	CANCELED: `Canceled`,
	ACTIVE: `Active`,
	DRAFT: `Draft`,
	CLOSED: `Closed`,
	PRIVATE: `Private`,
};
export const InvestmentStatusFormat: Record<InvestmentStatus, string> = {
	ACCEPT: 'Accept',
	NOT_ACCEPT: 'Not Accepted',
	PENDING: 'Pending',
	CANCELED: 'Canceled',
};
export const UserStatusFormat: Record<UserStatus, string> = {
	ACTIVE: 'Active',
	INACTIVE: 'Inactive',
};
export const UserRoleFormat: Record<UserRole, string> = {
	ADMIN: 'Admin',
	USER: 'User',
	USERPLUS: 'User Plus',
};
export const dateFormat = (date: Date) => {
	return new Date(date).toLocaleString('en-US', {
		timeZone: 'UTC',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};
