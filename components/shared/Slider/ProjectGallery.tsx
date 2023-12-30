'use client';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { useEffect, useState } from 'react';
import type { Swiper as SwiperSliderType } from 'swiper';
import Image from 'next/image';
import { filterImages } from '@/lib/utils';
import Placeholder from '../Cards/Placeholder';

type ProjectGalley = {
	alt: string;
	thumbnail: GalleryFile | null;
	gallery: GalleryFile[] | null;
};

const ProjectGallery: React.FC<ProjectGalley> = ({
	alt,
	thumbnail,
	gallery,
}) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperSliderType | null>(
		null,
	);
	const [resultArray, setResultArray] = useState<GalleryFile[]>([]);
	useEffect(() => {
		const newArray: GalleryFile[] = [];

		if (thumbnail) {
			newArray.push(thumbnail);
		}

		const filteredGallery = filterImages(gallery);
		newArray.push(...filteredGallery);

		setResultArray(newArray);
	}, [thumbnail, gallery]);

	return (
		<div className="project-gallery-wrap">
			{resultArray.length > 0 ? (
				<>
					<Swiper
						spaceBetween={10}
						navigation={true}
						thumbs={{ swiper: thumbsSwiper }}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper2"
					>
						{resultArray.map((slide, index) => (
							<SwiperSlide key={index}>
								<Image
									src={`/files/uploads/${slide.url}`}
									alt={alt}
									width={1280}
									height={850}
									priority={true}
									className="w-full md:h-[380px] h-[300px] object-cover rounded-md"
								/>
							</SwiperSlide>
						))}
					</Swiper>
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={15}
						slidesPerView={4}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mt-[15px]"
					>
						{resultArray.map((thumb, index) => (
							<SwiperSlide key={index}>
								<Image
									src={`/files/uploads/${thumb.url}`}
									alt={alt}
									width={1280}
									height={850}
									priority={true}
									className="w-full xm:h-[100px] h-[60px] object-cover rounded-md"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</>
			) : (
				<Placeholder
					containerClass={'md:h-[480px] h-[400px]'}
					iconClass={'!text-[120px]'}
				/>
			)}
		</div>
	);
};

export default ProjectGallery;
