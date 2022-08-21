import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = ({ listing }) => {
  return (
    <div>
        <div className='border-2 border-transparent h-[200px] md:h-[500px] my-6'>
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
    //   slidesPerView={1}
    //   navigation
      pagination={true}
    >
        {listing.imgs.map((img, i) => (
            <SwiperSlide key={i}>
                <img src={img} alt="slide img" className='max-h-[200px] md:max-h-[500px] w-full object-cover rounded-xl'/>
            </SwiperSlide>
        ))}
    </Swiper>
            
        </div>
    </div>
  )
}

export default Carousel