'use client';
import { Button } from '@/components/ui/button';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
	pages: number;
	containerClass: string;
	prevBtnClass: string;
	nextBtnClass: string;
	paginateBtnClass: string;
	paginateActiveClass: string;
};

const Pagination: React.FC<PaginationProps> = ({
	pages,
	containerClass,
	prevBtnClass,
	nextBtnClass,
	paginateBtnClass,
	paginateActiveClass,
}) => {
	const showPages = 3;
	const searchParams = useSearchParams();
	const router = useRouter();
	const paramFilter = searchParams.get('page') || 1;

	const startPage = Math.max(
		1,
		parseInt(paramFilter as string) - Math.floor(showPages / 2),
	);
	const endPage = Math.min(pages, startPage + showPages - 1);

	const renderPages = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i,
	);

	const handlePaginationClick = (value: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: 'page',
			value: value.toLowerCase(),
		});
		router.push(newUrl, { scroll: false });
	};

	return (
		<>
			{pages > 1 && (
				<nav className={`flex items-center ${containerClass}`}>
					<ul className="flex items-center gap-[5px]">
						<li>
							<Button
								className={`${
									prevBtnClass.length > 0
										? prevBtnClass
										: 'dark-bg__100-light__white'
								}`}
								disabled={parseInt(paramFilter as string) === 1}
								onClick={() =>
									handlePaginationClick(
										(
											parseInt(paramFilter as string) - 1
										).toString(),
									)
								}
							>
								Previous
							</Button>
						</li>
						{renderPages.map((page) => (
							<li key={page}>
								<Button
									onClick={() =>
										handlePaginationClick(page.toString())
									}
									className={`dark-bg__100-light__white ${paginateBtnClass} ${
										page === parseInt(paramFilter as string)
											? paginateActiveClass
											: ''
									}`}
									disabled={
										parseInt(paramFilter as string) === page
									}
								>
									{page}
								</Button>
							</li>
						))}
						<li>
							<Button
								disabled={
									parseInt(paramFilter as string) === pages
								}
								onClick={() =>
									handlePaginationClick(
										(
											parseInt(paramFilter as string) + 1
										).toString(),
									)
								}
								className={`${
									nextBtnClass.length > 0
										? nextBtnClass
										: 'dark-bg__100-light__white'
								}`}
							>
								Next
							</Button>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
};

export default Pagination;
