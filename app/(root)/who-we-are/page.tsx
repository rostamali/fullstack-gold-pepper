import MemberCard from '@/components/shared/Cards/MemberCard';
import { teamMembers } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const AboutUsPage = () => {
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
				id="about-us"
				className="py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="section__header">
						<div className="grid md:grid-cols-2 grid-cols-1 md:gap-[60px] gap-[30px] items-center">
							<h2 className="heading-2">
								Gold & Pepper: A Synthesis of Expertise and
								Vision
							</h2>
							<p className="text-base-2 dark:text-white">
								Positioned at the confluence of the Middle
								Eastern and European business landscapes, Gold &
								Pepper represents a paradigm of excellence in
								the realm of business consultancy. Our
								institution is meticulously crafted upon pillars
								of professional acumen, industry foresight, and
								an unwavering commitment to stakeholder value.
							</p>
						</div>
					</div>
					<Image
						src={'/images/home-hero-banner.jpg'}
						alt={`Gold & Pepper: A Synthesis of Expertise and Vision`}
						width={2560}
						height={1440}
						className="w-full md:h-[550px] h-[300px] object-cover rounded-lg mt-[60px]"
					/>
				</div>
			</section>
			<section
				id="our-team"
				className="py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="section-header">
						<div className="flex flex-col gap-[20px]">
							<span className="text-base-2 !text-primary-orange-light">
								About Us
							</span>
							<h2 className="heading-2">Our team</h2>
							<p className="text-base-2 dark:text-white">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit.
							</p>
						</div>
					</div>
					<div className="team-members mt-[60px]">
						<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
							{teamMembers.map((team, index) => (
								<MemberCard
									name={team.name}
									title={team.title}
									description={team.description}
									thumbnail={team.icon}
									index={index}
									key={index}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section
				id="networks"
				className="py-[60px] bg-dark__100-light__white"
			>
				<div className="container">
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] items-center">
						<div className="flex flex-col gap-[25px]">
							<span className="text-base-2 !text-primary-orange-light">
								Our Network
							</span>
							<div className="flex flex-col gap-[15px]">
								<h3 className="heading-3">
									EUROPE - AD Advisory
								</h3>
								<p className="text-base-1 dark:text-white">
									Renowned for its rigorous methodologies and
									client-centric approach, AD Advisory has
									been a stalwart in the European consultancy
									landscape since 2012. Their comprehensive
									service suite, combined with decades of
									collective expertise, positions them as a
									valuable ally in our quest for global
									excellence.
								</p>
							</div>
							<div className="flex flex-col gap-[15px]">
								<h3 className="heading-3">
									MIDDLE EAST - IQ Hospitality
								</h3>
								<p className="text-base-1 dark:text-white">
									Headquartered in Dubai, IQ Hospitality is a
									consultancy powerhouse specializing in F&B
									strategies. Their expansive service
									spectrum, coupled with collaborations with
									esteemed brands, amplifies our capacity to
									deliver unparalleled value to our clients.
								</p>
							</div>
							<p className="text-base-1 dark:text-white">
								Headquartered in Dubai, IQ Hospitality is a
								consultancy powerhouse specializing in F&B
								strategies. Their expansive service spectrum,
								coupled with collaborations with esteemed
								brands, amplifies our capacity to deliver
								unparalleled value to our clients.
							</p>
						</div>
						<Image
							src={'/images/home-hero-banner.jpg'}
							alt={'The Genesis of Gold & Pepper'}
							width={2560}
							height={1440}
							priority={true}
							className="object-cover w-full md:h-[600px] h-[300px] rounded-lg"
						/>
					</div>
				</div>
			</section>
		</main>
	);
};

export default AboutUsPage;
