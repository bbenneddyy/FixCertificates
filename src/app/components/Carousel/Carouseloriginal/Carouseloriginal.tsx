import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from 'react';

import arrowLeft from "./src/app/components/Carousel/assets/arrow-left.svg";
import arrowRight from "./src/app/components/Carousel/assets/arrow-right.svg";

interface CarouseloriginalProps {
    slides: StaticImageData[];
  }

function Carouseltailorginal({ slides }: CarouseloriginalProps ) {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-900">
      <div className="w-4/5 max-w-5xl">
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination]}
          navigation={{
            prevEl: ".button-prev",
            nextEl: ".button-next",
          }}
          pagination={{
            clickable: true,
          }}
          speed={1000}
          slidesPerView={"auto"}
          centeredSlides
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center w-96 h-96">
              <Image src={slide} alt="" className="w-full h-full object-contain" />
            </SwiperSlide>
          ))}
          <div className="button-prev absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex justify-center items-center cursor-pointer z-10 hover:bg-opacity-30">
            <Image src={arrowLeft} alt="arrowLeft" />
          </div>
          <div className="button-next absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex justify-center items-center cursor-pointer z-10 hover:bg-opacity-30">
            <Image src={arrowRight} alt="arrowRight" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Carouseltailorginal;