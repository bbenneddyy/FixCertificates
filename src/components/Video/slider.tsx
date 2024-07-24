'use client'
import React from 'react';import {Swiper , SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import {FreeMode,Pagination} from 'swiper/modules'
//import {RxArrowTopRight} from 'react-icons/rx'
import { SampleSlider } from '@/constants'
export default function Slider() {
  return (
    <div className='flex items-center justify-center flex-col h-screen bg-cyan-950'>
        <Swiper
            breakpoints={{
                340: {
                    slidesPerView: 2,
                    spaceBetween: 120
                },
                700: {
                    slidesPerView: 3,
                    spaceBetween: 120
                }
            }}
            freeMode={true}
            pagination={{
                clickable: true
            }}
            modules={[FreeMode, Pagination]}
            className= 'max-w-[90%] lg:max-w-[80%]'>
                {SampleSlider.map((item)=>(
                    <SwiperSlide key={item.title}>
                        <div className='flex flex-col gap-16 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] bg-lime-800'>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    </div>
  )
}
