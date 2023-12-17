import {
	FiSun,
	FiMoon,
	FiMonitor,
	FiMail,
	FiPhone,
	FiMapPin,
} from 'react-icons/fi';
import { FaFacebook, FaLinkedin, FaSquareInstagram } from 'react-icons/fa6';
import {
	FcBusinessContact,
	FcGenealogy,
	FcConferenceCall,
} from 'react-icons/fc';
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
export const featureList = [
	{
		icon: FcBusinessContact,
		title: 'What we do',
		description: `Gold & Pepper provides SMEs with a complete technical and financial consultancy service. It supports the companies at every relationship stage with financial intermediaries, suppliers, and contractors.`,
		url: '/',
	},
	{
		icon: FcConferenceCall,
		title: 'Who we are',
		description: `We invite you to explore the Gold & Pepper difference. Entrust us with your challenges, and together, we will craft strategies that not only address your immediate concerns but position you for long-term success in the global hospitality arena.`,
		url: '/',
	},
	{
		icon: FcGenealogy,
		title: 'Connect with us',
		description: `We invite you to explore the Gold & Pepper difference. Entrust us with your challenges, and together, we will craft strategies that not only address your immediate concerns but position you for long-term success in the global hospitality arena.`,
		url: '/',
	},
];

export const homeContactInfo = [
	{
		icon: FiMail,
		title: 'Email',
		link: 'mailto:hello@goldpepper.com',
		linkText: 'hello@goldpepper.com',
	},
	{
		icon: FiPhone,
		title: 'Phone',
		link: 'tel:+1(555)000-0000',
		linkText: '+1 (555) 000-0000',
	},
	{
		icon: FiMapPin,
		title: 'Office',
		link: '123 Sample St, Sydney NSW 2000 AU',
		linkText: '123 Sample St, Sydney NSW 2000 AU',
	},
];
