import ServiceCard from '@/components/shared/Cards/ServiceCard';
import { advisoryServices, managementServices } from '@/constants';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const WhatWeDoPage = () => {
	return (
		<main>
			<section id="sub-banner" className="cta-bg h-[450px]"></section>
			<section
				id="about-us"
				className="md:py-[80px] py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 !text-primary-orange-light">
								Vision
							</span>
							<h2 className="heading-2">
								Gold & Pepper: A Synthesis of Expertise and
								Vision
							</h2>
						</div>
						<div className="flex flex-col gap-[20px] items-start">
							<p className="text-base-2 dark:text-white">
								Positioned at the confluence of the Middle
								Eastern and European business landscapes, Gold &
								Pepper represents a paradigm of excellence in
								the realm of business consultancy. Our
								institution is meticulously crafted upon pillars
								of professional acumen, industry foresight, and
								an unwavering commitment to stakeholder value.
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
				id="service"
				className="md:py-[80px] py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="section__header">
						<div className="section__header">
							<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
								<h2 className="heading-2">
									Gold & Pepper: A Synthesis of Expertise and
									Vision
								</h2>
								<p className="text-base-2 dark:text-white">
									Positioned at the confluence of the Middle
									Eastern and European business landscapes,
									Gold & Pepper represents a paradigm of
									excellence in the realm of business
									consultancy. Our institution is meticulously
									crafted upon pillars of professional acumen,
									industry foresight, and an unwavering
									commitment to stakeholder value.
								</p>
							</div>
						</div>
					</div>
					<div className="services__list">
						<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[25px] mt-[50px]">
							{advisoryServices.map((service, index) => (
								<ServiceCard
									key={index}
									data={service}
									link={false}
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
								<h2 className="heading-2 !text-white">
									Unlock Your Financial Potential with Our
									Investment Platform
								</h2>
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
				</div>
			</section>
			<section
				id="management"
				className="md:py-[80px] py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="grid lg:grid-cols-3 grid-cols-1 md:gap-[40px] gap-[60px]">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 !text-primary-orange-light">
								Investments
							</span>
							<h2 className="heading-2">Management Services</h2>
							<p className="text-base-3 dark:text-white">
								Gold & Pepper's investment arm specializes in
								identifying, funding, and stewarding unique
								hospitality and real estate investment
								opportunities across diverse markets. With an
								unblemished track record, we have solidified our
								position as the preferred partner for private
								equity firms, individual investors, and
								institutional funds.
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
						<div className="lg:col-span-2">
							<div className="grid sm:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[30px]">
								{managementServices.map((service, index) => (
									<ServiceCard
										key={index}
										data={service}
										link={false}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default WhatWeDoPage;
