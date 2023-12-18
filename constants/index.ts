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
		url: '/who-we-are',
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
export const teamMembers = [
	{
		icon: 'team-1.jpg',
		name: 'Federico Castiello',
		title: 'Founder',
		description: `As the visionary architect behind Gold & Pepper, Federico Castiello brings to the table a rich tapestry of strategic acumen and entrepreneurial zeal. With nearly a decade of cross-industry expertise, Federico's leadership ensures that Gold & Pepper remains agile, innovative, and consistently aligned with global best practices.`,
	},
	{
		icon: 'team-2.jpg',
		name: 'Gianluca Corsi',
		title: 'Principal',
		description: `A seasoned strategist, Gianluca Corsi epitomizes the confluence of analytical prowess and market intuition. His extensive tenure in data analytics and account management positions him as a pivotal asset to Gold & Pepper's expansive portfolio of services.`,
	},
	{
		icon: 'team-3.jpg',
		name: 'Antonio Muto',
		title: 'Principal',
		description: `As the Founding Principal of AD Consulenza, Antonio Muto brings with him an illustrious legacy of banking and financial leadership. His vast reservoir of experience, combined with academic credentials, fortifies Gold & Pepper's strategic vision and execution capabilities.`,
	},
];
