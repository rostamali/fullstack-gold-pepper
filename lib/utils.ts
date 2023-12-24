import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';

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
