import CategoryList from '@/components/shared/Tables/CategoryList';
import { fetchCategoryByAdmin } from '@/lib/actions/category.action';
import CreateCategory from '@/components/shared/Modal/CreateCategory';
import UploadCsv from '@/components/shared/Modal/UploadCsv';
type SearchParams = {
	searchParams: {
		page: string;
		type: string | null;
		q: string | null;
	};
};

const ProjectCategoriesPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchCategoryByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex items-center justify-between">
				<h2 className="heading-2 text-primary-black-dark dark:text-primary-black-dark">
					Categories
				</h2>
				<div className="flex items-center gap-[10px]">
					<CreateCategory />
					<UploadCsv type={'category'} />
				</div>
			</div>
			{result && <CategoryList data={result?.files} />}
		</div>
	);
};

export default ProjectCategoriesPage;
