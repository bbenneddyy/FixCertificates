import dynamic from 'next/dynamic';
import React from 'react';
import Image from 'next/image';
import arrowLeft from "./assets/arrow-left.svg";
import arrowRight from "./assets/arrow-right.svg";

// Dynamically import Swiper components with SSR disabled
const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), { ssr: false });

interface CarouselProps {
  slides: string[];
}

const Carousel = ({ slides }: CarouselProps) => {
  return (
    <Swiper
      navigation={{
        nextEl: '.button-next',
        prevEl: '.button-prev',
      }}
      loop={true}  // Enables looping of slides
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Image src={slide} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
        </SwiperSlide>
      ))}
      <div className="button-prev absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex justify-center items-center cursor-pointer z-10 hover:bg-opacity-30">
        <Image src={arrowLeft} alt="Previous slide" width={24} height={24} />
      </div>
      <div className="button-next absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex justify-center items-center cursor-pointer z-10 hover:bg-opacity-30">
        <Image src={arrowRight} alt="Next slide" width={24} height={24} />
      </div>
    </Swiper>
  );
};

export default Carousel;