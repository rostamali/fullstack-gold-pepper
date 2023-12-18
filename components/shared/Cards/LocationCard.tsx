import Link from 'next/link';
type LocationCardProps = {
	title: string;
	location: string;
	telephone: string;
	email: string;
};

const LocationCard: React.FC<LocationCardProps> = ({
	title,
	location,
	telephone,
	email,
}) => {
	return (
		<div className="grid sm:grid-cols-4 gap-[40px]">
			<h4 className="heading-4">{title}</h4>
			<div className="sm:col-span-3 flex flex-col gap-[12px]">
				<div className="info__item">
					<p className="text-base-3 dark:text-white !font-semibold flex flex-wrap gap-[5px]">
						Location:
						<span className="ml-[5px] font-normal">{location}</span>
					</p>
				</div>
				<div className="info__item">
					<p className="text-base-3 dark:text-white !font-semibold flex flex-wrap gap-[5px]">
						Telephone:
						<Link
							scroll={false}
							href={`tel:${telephone}`}
							className="location-info__link"
						>
							{telephone}
						</Link>
					</p>
				</div>
				<div className="info__item">
					<p className="text-base-3 dark:text-white !font-semibold flex flex-wrap gap-[5px]">
						E-mail:
						<Link
							scroll={false}
							href={`mailto:${email}`}
							className="text-primary-orange-light hover:underline"
						>
							{email}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LocationCard;
