import Footer from '@/components/shared/Footer/Footer';
import Header from '@/components/shared/Navbars/Header';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
