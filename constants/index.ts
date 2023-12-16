import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { FaFacebook, FaLinkedin, FaSquareInstagram } from 'react-icons/fa6';
export const themes = [
	{
		value: 'light',
		label: 'Light',
		icon: FiSun,
	},
	{
		value: 'dark',
		label: 'Dark',
		icon: FiMoon,
	},
	{
		value: 'system',
		label: 'System',
		icon: FiMonitor,
	},
];

export const headerLinks = [
	{
		label: 'Home',
		url: '/',
	},
	{
		label: 'About Us',
		url: '/about-us',
	},
	{
		label: 'Services',
		url: '/services',
	},
	{
		label: 'Contact Us',
		url: '/contact-us',
	},
];

export const termsLinks = [
	{
		label: 'Privacy Policy',
		url: '/',
	},
	{
		label: 'Terms Of Use',
		url: '/',
	},
];
export const socialLinks = [
	{
		label: 'Facebook',
		url: '/',
		icon: FaFacebook,
	},
	{
		label: 'LinkedIn',
		url: '/',
		icon: FaLinkedin,
	},
	{
		label: 'Instagram',
		url: '/',
		icon: FaSquareInstagram,
	},
];
