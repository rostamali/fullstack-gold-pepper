import CreateUser from '@/components/shared/Modal/CreateUser';
import UploadCsv from '@/components/shared/Modal/UploadCsv';
import UserList from '@/components/shared/Tables/UserList';
import { fetchUsersByAdmin } from '@/lib/actions/auth.action';
import Link from 'next/link';
import React from 'react';
type SearchParams = {
	searchParams: {
		page: string;
		status: UserStatus;
		q: string | null;
	};
};

const UsersListPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchUsersByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		status: searchParams.status
			? (searchParams.status.toLocaleUpperCase() as UserStatus)
			: null,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex items-center justify-between">
				<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark">
					Register Users
				</h2>
				<div className="flex items-center gap-[10px]">
					<CreateUser />
					<UploadCsv type={'user'} />
				</div>
			</div>
			{result && result.users && (
				<UserList data={result.users} pages={result.pages} />
			)}
		</div>
	);
};

export default UsersListPage;
