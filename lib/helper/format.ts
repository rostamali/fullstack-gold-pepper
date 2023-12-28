export const ProjectStatusFormat: Record<ProjectStatus, string> = {
	COMPLETED: `Completed`,
	CANCELED: `Canceled`,
	ACTIVE: `Active`,
	DRAFT: `Draft`,
	CLOSED: `Closed`,
	PRIVATE: `Private`,
};
export const dateFormat = (date: Date) => {
	return new Date(date).toLocaleString('en-US', {
		timeZone: 'UTC',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};
