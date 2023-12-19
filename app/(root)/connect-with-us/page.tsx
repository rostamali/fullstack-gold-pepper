import LocationCard from '@/components/shared/Cards/LocationCard';
import { globalFootprint } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const ConnectWithUs = () => {
	return (
		<main>
			<section id="sub-banner" className="cta-bg h-[450px]"></section>
			<section />
			<section
				id="about-us"
				className="py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 !text-primary-orange-light">
								Vision
							</span>
							<h2 className="heading-2">
								Engage with Gold & Pepper: A Gateway to
								Expertise
							</h2>
						</div>
						<div className="flex flex-col gap-[20px] items-start">
							<p className="text-base-2 dark:text-white">
								In the dynamic realm of hospitality consultancy,
								effective communication and timely engagement
								are paramount. At Gold & Pepper, we prioritize
								accessibility and responsiveness, ensuring that
								our clients and partners always have a direct
								channel to our expertise.
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
				id="about-us"
				className="py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="section__header">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<div className="flex flex-col gap-[20px]">
								<h2 className="heading-2">
									Our Global Footprint
								</h2>
								<p className="text-base-2 dark:text-white">
									Gold & Pepper's expansive operational
									network spans strategic locations,
									positioning us to serve diverse market needs
									with agility and precision.
								</p>
							</div>
						</div>
					</div>
					<div className="mt-[50px]">
						<div className="flex flex-col gap-[60px]">
							{globalFootprint.map((office, index) => (
								<LocationCard
									key={index}
									title={office.title}
									location={office.location}
									telephone={office.telephone}
									email={office.email}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section
				id="Contact"
				className="py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] items-center">
						<div className="flex flex-col gap-[25px]">
							<span className="text-base-2 !text-primary-orange-light">
								Our Journey
							</span>
							<div className="flex flex-col gap-[15px]">
								<h3 className="heading-3">
									Embrace the Future with Gold & Pepper
								</h3>
								<p className="text-base-1 dark:text-white">
									Your journey towards industry leadership and
									sustainable growth is but a conversation
									away. Engage with Gold & Pepper today and
									unlock a world of strategic insights,
									tailored solutions, and unparalleled
									expertise.
								</p>
							</div>
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
									Contact
								</Link>
							</div>
						</div>
						<Image
							src={'/images/our-journey.jpg'}
							alt={'The Genesis of Gold & Pepper'}
							width={1279}
							height={854}
							priority={true}
							className="object-cover w-full h-[300px] rounded-lg"
						/>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ConnectWithUs;
