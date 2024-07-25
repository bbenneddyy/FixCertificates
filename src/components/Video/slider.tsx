'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { SampleSlider } from '@/constants';
import { useEffect, useRef, useState } from 'react'; // Add useEffect and useRef

export default function Slider() {
    const [activeIndex, setActiveIndex] = useState(1); // Start with the first item as active
    const swiperRef = useRef(null); // Reference to the Swiper instance
  
    return (
      <div className='flex items-center justify-center h-screen bg-cyan-950'>
          <Swiper
              ref={swiperRef} // Attach the ref to Swiper
              initialSlide={1} // Set the initial slide to the first item
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
              freeMode={false} // Disable free mode
              centeredSlides={true} // Center the active slide
              slidesPerView={3} // Set a fixed number of slides to view
              spaceBetween={10} // Adjust space between slides
              modules={[FreeMode]} // Only include FreeMode module
              className='max-w-[90%] lg:max-w-[80%]'>
                  {SampleSlider.map((item, index) => {
                      const isActive = activeIndex === index; // Check if the slide is active
                      const isInactive = activeIndex !== index; // Check if the slide is inactive
  
                      return (
                          <SwiperSlide key={item.title} 
                              className={`flex justify-center items-center transition-transform duration-500 ease-in-out ${isActive ? 'scale-110 w-[250px]' : 'scale-100 w-[215px]'} ${isInactive ? 'opacity-50' : 'opacity-100'}`}>
                              <div className={`flex flex-col gap-16 group relative shadow-lg text-white rounded-xl px-6 py-8 ${isActive ? 'h-[400px]' : 'h-[250px]'} w-full bg-lime-800 transition-all duration-500 ease-in-out`}>
                               {item.title}
                              </div>
                          </SwiperSlide>
                      );
                  })}
              </Swiper>
      </div>
    )
  }