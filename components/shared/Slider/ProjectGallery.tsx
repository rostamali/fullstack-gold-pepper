'use client';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { useState } from 'react';
import type { Swiper as SwiperSliderType } from 'swiper';
import Image from 'next/image';

const ProjectGallery = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperSliderType | null>(
		null,
	);

	const thumbnail = {
		url: `https://swiperjs.com/demos/images/nature-1.jpg`,
	};
	const gallery = [
		{
			url: `https://swiperjs.com/demos/images/nature-2.jpg`,
		},
		{
			url: `https://swiperjs.com/demos/images/nature-3.jpg`,
		},
		{
			url: `https://swiperjs.com/demos/images/nature-4.jpg`,
		},
		{
			url: `https://swiperjs.com/demos/images/nature-5.jpg`,
		},
		{
			url: `https://swiperjs.com/demos/images/nature-6.jpg`,
		},
		{
			url: `https://swiperjs.com/demos/images/nature-7.jpg`,
		},
		{
			url: `https://swiperjs.com/demos/images/nature-8.jpg`,
		},
		{
			url: `https://swiperjs.com/demos/images/nature-10.jpg`,
		},
	];

	return (
		<div>
			<Swiper
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper2"
			>
				{[thumbnail, ...gallery].map((slide, index) => (
					<SwiperSlide key={index}>
						<Image
							src={slide.url}
							alt={''}
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
				{[thumbnail, ...gallery].map((thumb, index) => (
					<SwiperSlide key={index}>
						<Image
							src={thumb.url}
							alt={''}
							width={1280}
							height={850}
							priority={true}
							className="w-full xm:h-[100px] h-[60px] object-cover rounded-md"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProjectGallery;
