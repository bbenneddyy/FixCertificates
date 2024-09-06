"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { SampleSlider } from "@/constants";
import Image from "next/image";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(1); 
  const [popupTitle, setPopupTitle] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const swiperRef = useRef(null); 

  const handleSlideClick = (title: string, video: string) => {
    setPopupTitle(title);
    setShowVideo(video);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center h-screen bg-cyan-950">
          <Swiper
            ref={swiperRef} // Attach the ref to Swiper
            initialSlide={1} // Set the initial slide to the first item
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
            freeMode={false} // Disable free mode
            centeredSlides={true} // Center the active slide
            slidesPerView={1.5} // Set a fixed number of slides to view
            spaceBetween={10} // Adjust space between slides
            modules={[FreeMode]} // Only include FreeMode module
            className="max-w-[90%] lg:max-w-[80%]"
          >
            {SampleSlider.map((item, index) => {
              const isActive = activeIndex === index; // Check if the slide is active
              const isInactive = activeIndex !== index; // Check if the slide is inactive

              return (
                <SwiperSlide
                  key={item.title}
                  onClick={() => handleSlideClick(item.title, item.video)} // Pass video source to the click handler
                  className={`flex justify-center items-center transition-transform duration-500 ease-in-out${isActive ? 'scale-110 w-[250px]' : 'scale-100 w-[215px]'} ${isInactive ? "opacity-50" : "opacity-100"}`}
                >
                  <div className={`w-full bg-lime-800 flex items-center justify-center text-white rounded-xl px-6 py-8 transition-all duration-500 ease-in-out ${isActive ? "h-[400px]" : "h-[250px]"} group`}>
                    <Image
                      src={`${item.backgroundImage}`}
                      alt="placeholder"
                      layout="fill"
                      objectFit="cover"
                      className="relative w-full h-full rounded-xl overflow-hidden"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {popupTitle && ( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded w-3/5 h-3/5 relative"> {/* Set width and height to 3/5 of the page */}
            <button 
              className="absolute top-2 right-2 text-xl font-bold" 
              onClick={() => {
                setPopupTitle(null); 
                setShowVideo(null);
              }}
            >
              X
            </button>
            <h2 className="text-center">{popupTitle}</h2>
            {showVideo && ( 
              <video controls className="w-full h-full mt-4" poster="/path/to/your/poster.webp"> {/* Update the path to your local video */}
                <source src={showVideo} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      )}
    </>
  );
}