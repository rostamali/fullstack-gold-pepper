import { headerLinks, socialLinks, termsLinks } from '@/constants';
import Link from 'next/link';
import Subscribe from '../Forms/Subscribe';

const Footer = () => {
	return (
		<footer id="footer" className="bg-dark__200-light__white py-[60px]">
			<div className="container">
				<div className="footer__content">
					<div className="grid md:grid-cols-9 grid-cols-2 lg:gap-[60px] gap-[30px]">
						<div className="md:col-span-3 col-span-2">
							<Link
								href="/"
								className="inline-block font-spaceGrotesk font-bold text-[26px] text-primary-black-dark dark:text-white"
							>
								Gold{' '}
								<span className="text-primary-orange-dark">
									& Pepper
								</span>
							</Link>
							<p className="text-base-3 my-[20px] dark:text-white">
								We are a leading investment portal, providing
								individuals with the tools and knowledge to make
								informed investment decisions. With our
								user-friendly platform and expert guidance, you
								can confidently navigate the world of investing
								and achieve your financial goals.
							</p>
							<h3 className="heading-4 mb-[20px]">Follow us</h3>
							<ul className="flex gap-[20px] flex-wrap">
								{socialLinks.map((link, index) => (
									<li key={index}>
										<Link
											href={link.url}
											className="text-base-3 flex items-center gap-[5px] link-dark__black-light__white"
										>
											<link.icon className="text-[18px]" />
											<span className="text-[16px]">
												{link.label}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="md:col-span-3 xm:col-span-1 col-span-2">
							<div className="md:ml-[40px]">
								<h3 className="heading-4 mb-[30px]">
									Important links
								</h3>
								<ul className="flex flex-col gap-[15px]">
									{headerLinks.map((item, index) => (
										<li key={index}>
											<Link
												href={item.url}
												className="text-base-3 dark:text-white"
											>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="md:col-span-3 xm:col-span-1 col-span-2">
							<h3 className="heading-4 mb-[30px]">Newsletter</h3>
							<Subscribe />
						</div>
					</div>
				</div>
				<div className="footer__copyright border-t pt-[40px] mt-[40px] border-t-primary-black-thin dark:border-t-primary-dark-100">
					<div className="flex sm:items-center sm:flex-row justify-between flex-col-reverse gap-[20px]">
						<div className="text-base-2 dark:text-white">
							&copy;2023 Gold & Pepper. All rights reserved.
						</div>
						<ul className="flex items-center gap-[30px]">
							{termsLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.url}
										className="text-base-3 underline link-dark__black-light__white"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
