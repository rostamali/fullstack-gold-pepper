import FileLibrary from '@/components/admin/Modals/FileLibrary';
import FileUploader from '@/components/admin/Modals/FileUploader';
import Pagination from '@/components/shared/Search/Pagination';
import { fetchFilesByAdmin } from '@/lib/actions/file.action';
type SearchParams = {
	searchParams: {
		page: string;
	};
};

const FilePage = async ({ searchParams }: SearchParams) => {
	const result = await fetchFilesByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
	});

	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex items-center justify-between">
				<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark">
					Files
				</h2>
				<FileUploader />
			</div>
			{result && <FileLibrary files={result.files} />}
			<Pagination
				pages={result ? result.pages : 1}
				containerClass={'justify-end'}
				prevBtnClass={'btn-primary'}
				nextBtnClass={'btn-primary'}
				paginateBtnClass={
					'btn-primary__ghost !bg-transparent dark:text-primary-orange-dark text-primary-orange-dark hover:text-white dark:hover:text-white w-[40px]'
				}
				paginateActiveClass={'btn-primary dark:text-white'}
			/>
		</div>
	);
};

export default FilePage;
