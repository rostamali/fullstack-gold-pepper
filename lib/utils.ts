import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';
import slugify from 'slugify';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}
interface RemoveUrlQueryParams {
	params: string;
	keysToRemove: string[];
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
	const currectUrl = queryString.parse(params);
	currectUrl[key] = value;

	return queryString.stringifyUrl(
		{
			url: window.location.pathname,
			query: currectUrl,
		},
		{
			skipNull: true,
		},
	);
};
export const removeKeysFromQuery = ({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) => {
	const currectUrl = queryString.parse(params);

	keysToRemove.forEach((key: string) => {
		delete currectUrl[key];
	});

	return queryString.stringifyUrl(
		{
			url: window.location.pathname,
			query: currectUrl,
		},
		{
			skipNull: true,
		},
	);
};
export const fileSizeFormat = (bytes: number, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export const createSlug = async (name: string) => {
	const slug = await slugify(name, {
		replacement: '-',
		lower: true,
		trim: true,
	});
	return slug;
};
export const toggleSelectAll = <T extends { id: string }>(
	data: T[],
	selectedItems: string[] | null,
	setSelectedItems: (value: string[] | null) => void,
) => {
	const categoryIds = data.map((item: T) => item.id);
	if (selectedItems) {
		if (selectedItems?.length === categoryIds?.length) {
			setSelectedItems(null);
		} else {
			setSelectedItems(categoryIds);
		}
	} else {
		setSelectedItems(categoryIds);
	}
};
export const isChecked = (selectedItems: string[] | null, id: string) => {
	const checked = selectedItems?.includes(id) ? true : false;
	return checked;
};
export const isSelectAll = <T>(data: T[], selectedItems: string[] | null) => {
	const checked = data
		? data.length === selectedItems?.length
			? true
			: false
		: false;
	return checked;
};
export const toggleSelectList = (
	selectedItems: string[] | null,
	setSelectedItems: (value: string[] | null) => void,
	itemId: string,
) => {
	if (selectedItems) {
		if (selectedItems.includes(itemId)) {
			setSelectedItems(
				selectedItems.filter((id: string) => id !== itemId),
			);
		} else {
			setSelectedItems([...selectedItems, itemId]);
		}
	} else {
		setSelectedItems([itemId]);
	}
};
export const filterImages = (files: GalleryFile[] | null): GalleryFile[] => {
	if (!files) {
		return [];
	}

	return files.filter((file) => file.fileType === 'image');
};
