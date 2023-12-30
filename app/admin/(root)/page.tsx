'use client';
import { Button } from '@/components/ui/button';
import { exportCategoryToCSV } from '@/lib/actions/category.action';
import React from 'react';

const AdminPage = () => {
	const handleDownload = async () => {
		try {
			const result = await exportCategoryToCSV();
		} catch (error) {}
	};
	return (
		<div>
			<Button onClick={handleDownload}>Export</Button>
		</div>
	);
};

export default AdminPage;
