import InvestmentList from '@/components/shared/Tables/InvestmentList';
import { fetchInvestmentsByAdmin } from '@/lib/actions/investment.action';
import Link from 'next/link';
type SearchParams = {
	searchParams: {
		page: string;
		status: InvestmentStatus;
		q: string | null;
	};
};

const InvestmentListPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchInvestmentsByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		status: searchParams.status
			? (searchParams.status.toLocaleUpperCase() as InvestmentStatus)
			: null,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex items-center justify-between">
				<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark">
					Invested List
				</h2>
				<div className="flex items-center gap-[10px]">
					<Link
						href="/admin/project/create"
						className="btn-primary !h-[50px] !px-[25px]"
					>
						Add Project
					</Link>
				</div>
			</div>
			{result && result.investments && (
				<InvestmentList
					data={result.investments}
					pages={result.pages}
				/>
			)}
		</div>
	);
};

export default InvestmentListPage;
