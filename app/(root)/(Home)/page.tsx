import ServiceCard from '@/components/shared/Cards/ServiceCard';
import Contact from '@/components/shared/Forms/Contact';
import { homeContactInfo, featureList } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const HomePage = () => {
	return (
		<main>
			<section
				id="home-hero"
				className="md:py-[100px] py-[60px] bg-dark__200-light__white"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px] items-center">
						<div className="flex flex-col gap-[30px]">
							<h1 className="heading-1">
								The Genesis of Gold & Pepper
							</h1>
							<p className="text-base-1 dark:text-white">
								Situated at the strategic nexus between the
								Middle Eastern and European markets, Gold &
								Pepper was conceived to address the nuanced
								demands of the hospitality sector. Our
								foundation is anchored in the principles of
								professional integrity, precise market insight,
								and unwavering commitment to client success.
							</p>
							<div className="flex items-center gap-[15px]">
								<Link
									href="/"
									className="btn-primary__ghost !h-[45px] !px-[20px]"
								>
									About us
								</Link>
								<Link
									href="/"
									className="btn-primary !h-[45px] !px-[20px]"
								>
									Investment portals
								</Link>
							</div>
						</div>
						<Image
							src={'/images/home-hero-banner.jpg'}
							alt={'The Genesis of Gold & Pepper'}
							width={2560}
							height={1440}
							priority={true}
							className="object-cover w-full md:h-[500px] h-[300px] rounded-xl border-2 dark:border-primary-dark-100"
						/>
					</div>
				</div>
			</section>
			<section
				id="about-us"
				className="md:py-[80px] py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 !text-primary-orange-light">
								Invest
							</span>
							<h2 className="heading-2">
								Unlock Your Financial Potential with Our
								Investment Platform
							</h2>
						</div>
						<div className="flex flex-col gap-[20px] items-start">
							<p className="text-base-2 dark:text-white">
								We are a leading investment portal, providing
								individuals with the tools and knowledge to make
								informed investment decisions. With our
								user-friendly platform and expert guidance, you
								can confidently navigate the world of investing
								and achieve your financial goals.
							</p>
							<div className="flex items-center gap-[15px]">
								<Link href="" className="btn-primary">
									Learn more
								</Link>
								<Link href="/sign-up" className="btn-text-icon">
									Sign up
									<FiChevronRight />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				id="feature-list"
				className="md:py-[80px] py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="feature-header">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<div className="flex flex-col gap-[20px]">
								<h2 className="heading-2">
									Discover the Power of Our Investment
									Platform
								</h2>
							</div>
							<div className="flex flex-col gap-[20px] items-start">
								<p className="text-base-2 dark:text-white">
									With our user-friendly interface, you can
									easily track your investments, analyze
									performance, and access real-time market
									data. Take control of your financial future
									today.
								</p>
							</div>
						</div>
					</div>
					<div className="feature-items mt-[60px]">
						<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
							{featureList.map((feature, index) => (
								<ServiceCard
									key={index}
									data={feature}
									link={true}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section id="cta-banner" className="cta-bg py-[100px]">
				<div className="container">
					<div className="cta-banner-header">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<div className="flex flex-col gap-[20px]">
								<span className="text-base-2 !text-primary-orange-light">
									Invest
								</span>
								<h2 className="heading-2">
									Unlock Your Financial Potential with Our
									Investment Platform
								</h2>
							</div>
							<div className="flex flex-col gap-[20px] items-start">
								<p className="text-base-2 dark:text-white">
									We are a leading investment portal,
									providing individuals with the tools and
									knowledge to make informed investment
									decisions. With our user-friendly platform
									and expert guidance, you can confidently
									navigate the world of investing and achieve
									your financial goals.
								</p>
								<div className="flex items-center gap-[15px]">
									<Link href="" className="btn-primary">
										Learn more
									</Link>
									<Link
										href="/sign-up"
										className="btn-text-icon"
									>
										Sign up
										<FiChevronRight />
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="cta-banner-logos mt-[80px]">
						<div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-[20px] items-center">
							{[1, 2, 3, 4, 5].map((item, index) => (
								<Image
									src={`/images/client-logo/1000${item}.png`}
									alt={'Client logo'}
									width={113}
									height={80}
									key={index}
									className="object-contain w-auto h-[60px]"
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section
				id="contact-details"
				className="md:py-[80px] py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="contact-header">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 !text-primary-orange-light">
								Contact
							</span>
							<h2 className="heading-2">Contact us</h2>
							<p className="text-base-2 dark:text-white">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit.
							</p>
						</div>
					</div>
					<div className="contact-info my-[60px]">
						<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[40px]">
							{homeContactInfo.map((info, index) => (
								<div
									key={index}
									className="flex flex-col gap-[15px]"
								>
									<info.icon className="text-white text-[40px]" />
									<h3 className="heading-3">{info.title}</h3>
									<p className="text-base-3 !text-white">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit. Suspendisse varius enim
										in ero.
									</p>
									<Link
										href={info.link}
										className="text-base-2 !text-white underline"
									>
										{info.linkText}
									</Link>
								</div>
							))}
						</div>
					</div>
					<div className="contact-form-wrap">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px]">
							<div className="contact-form">
								<div className="flex flex-col gap-[20px]">
									<h2 className="heading-2">
										Send us message
									</h2>
									<p className="text-base-2 dark:text-white">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit.
									</p>
								</div>
								<Contact />
							</div>
							<Image
								src={'/images/contact-form-thumbnail.jpg'}
								width={750}
								height={1125}
								alt={'Send us message'}
								className="object-cover w-full md:h-[550px] h-[350px] rounded-lg object-top"
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default HomePage;
