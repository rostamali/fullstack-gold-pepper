import {
	FiSun,
	FiMoon,
	FiMonitor,
	FiMail,
	FiPhone,
	FiMapPin,
	FiTrello,
	FiUsers,
	FiAperture,
	FiCommand,
	FiImage,
	FiClipboard,
	FiZap,
	FiUser,
	FiLifeBuoy,
} from 'react-icons/fi';
import {
	FaCube,
	FaFacebook,
	FaLinkedin,
	FaSquareInstagram,
} from 'react-icons/fa6';
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
		label: 'What we do',
		url: '/what-we-do',
	},
	{
		label: 'About Us',
		url: '/who-we-are',
	},
	{
		label: 'Connect us',
		url: '/connect-with-us',
	},
	{
		label: 'Portals',
		url: '/project',
	},
];
export const adminHeaderLinks = [
	{
		label: 'Dashboard',
		link: '/admin/dashboard',
		icon: FiCommand,
	},
	{
		label: 'Files',
		link: '/admin/files',
		icon: FiImage,
	},

	{
		label: 'Projects',
		link: '/admin/d/project',
		icon: FiClipboard,
		submenu: [
			{
				label: 'All Projects',
				link: '/admin/d/project',
			},
			{
				label: 'Trash Projects',
				link: '/admin/d/project/trash',
			},
			{
				label: 'New Project',
				link: '/admin/d/project/create',
			},
		],
	},
	{
		label: 'Investors',
		link: '/admin/d/investor',
		icon: FiZap,
	},
	{
		label: 'Users',
		link: '/admin/d/user',
		icon: FiUser,
	},
	{
		label: 'Profile',
		link: '/admin/d/user/profile',
		icon: FiLifeBuoy,
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
		icon: FiTrello,
		name: 'What we do',
		description: `Gold & Pepper provides SMEs with a complete technical and financial consultancy service. It supports the companies at every relationship stage with financial intermediaries, suppliers, and contractors.`,
		url: '/',
	},
	{
		icon: FiUsers,
		name: 'Who we are',
		description: `We invite you to explore the Gold & Pepper difference. Entrust us with your challenges, and together, we will craft strategies that not only address your immediate concerns but position you for long-term success in the global hospitality arena.`,
		url: '/',
	},
	{
		icon: FiAperture,
		name: 'Connect with us',
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
export const globalFootprint = [
	{
		title: 'MENA',
		location: 'Office 103, Building A2, DSO, Dubai, UAE',
		telephone: '+971 58 642 1919',
		email: 'info@goldandpepper.com',
	},
	{
		title: 'EU',
		location: 'Italy, Rome',
		telephone: '+39 333 532 4977',
		email: 'Gcorsi@vertitur.it',
	},
	{
		title: 'Events Management ',
		location: 'United Arab Emirates',
		telephone: '+971 52 542 4638',
		email: 'Corina.tene@goldandpepper.com',
	},
];
export const advisoryServices = [
	{
		icon: FaCube,
		name: 'Market Entry',
		description: `Leveraging our intricate knowledge of the UAE business ecosystem and fortified by strong local affiliations, we provide bespoke solutions ensuring seamless business establishment and expansion.`,
	},
	{
		icon: FaCube,
		name: 'Valuations',
		description: `Through our vast network of professional affiliations, we present independent, objective valuations, underpinned by globally recognized methodologies, to cater to the diverse needs of investors and stakeholders.`,
	},
	{
		icon: FaCube,
		name: 'Financial Due Diligence',
		description: `Our analytical experts delve deep, identifying the strengths and potential vulnerabilities within businesses, safeguarding investments, and ensuring informed decision-making.`,
	},
	{
		icon: FaCube,
		name: 'Corporate Finance',
		description: `Gold & Pepper champions the establish-
		ment and optimization of international finance structures, accentuated by incisive KPI monitoring and stringent budget controls.`,
	},
	{
		icon: FaCube,
		name: 'Fundraising & M&A',
		description: `From conceptualizing investor pitches to meticulous data room preparation, we provide end-to-end support, ensuring our clients are equipped to navigate the multifaceted realms of fundraising and mergers & acquisitions.`,
	},
	{
		icon: FaCube,
		name: 'Management Reporting',
		description: `With precision and clarity at its core, our management reporting services provide actionable insights, fostering informed decision-making at every organizational level.`,
	},
];
export const managementServices = [
	{
		icon: FaCube,
		name: `Creative Solutions`,
		description: `Our holistic approach to hospitality focuses on the creation of integrated experiences, ensuring brand resonance, guest satisfaction, and optimal profitability`,
	},
	{
		icon: FaCube,
		name: `Design + Construction`,
		description: `In collaboration with industry frontrunners, we provide a gamut of services, from planning and design to technical assistance, ensuring that every project aligns with global benchmarks.`,
	},
	{
		icon: FaCube,
		name: `Asset Management`,
		description: `Our asset management offerings span from financial structuring and ROI analytics to renovation planning, ensuring a holistic approach to asset optimization.`,
	},
	{
		icon: FaCube,
		name: `Planning + Development`,
		description: `Comprehensive solutions, from site selection to financing, ensure that every venture is strategically aligned and operationally efficient.`,
	},
	// {
	// 	icon: '/images/management-service-thumbnail-5.jpg',
	// 	name: `Pre-Opening + Operations`,
	// 	description: `Our expertise extends to operational nuances, ensuring seamless pre-opening preparations and efficient ongoing operations.`,
	// },
];
