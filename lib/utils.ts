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
