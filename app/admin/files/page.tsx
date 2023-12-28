import FileLibrary from '@/components/shared/Sidebars/FileLibrary';
import FileUploader from '@/components/shared/Modal/FileUploader';
import Pagination from '@/components/shared/Search/Pagination';
import { fetchFilesByAdmin } from '@/lib/actions/file.action';
type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
	};
};

const FilePage = async ({ searchParams }: SearchParams) => {
	const result = await fetchFilesByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		type: searchParams.type ? searchParams.type : null,
		query: searchParams.q ? searchParams.q : null,
	});

	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex items-center justify-between">
				<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark">
					Files
				</h2>
				<FileUploader />
			</div>
			{result && (
				<FileLibrary
					pages={result?.pages ? result?.pages : 1}
					files={result.files}
				/>
			)}
		</div>
	);
};

export default FilePage;
