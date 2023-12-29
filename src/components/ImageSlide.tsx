import { useState } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { IoIosArrowBack } from 'react-icons/io'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {
  Main1,
  Main2,
  Main3,
  Main4,
  Main5,
  Main6,
  Main7,
  Main8,
  Main9,
  Main10,
  Main11,
  Main12,
  Main13,
  Main14,
} from '@/assets/images'

export default function ImageSlide() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const images = [
    {
      src: Main1,
    },
    {
      src: Main2,
    },
    {
      src: Main3,
    },
    {
      src: Main4,
    },
    {
      src: Main5,
    },
    {
      src: Main6,
    },
    {
      src: Main7,
    },
    {
      src: Main8,
    },
    {
      src: Main9,
    },
    {
      src: Main10,
    },
    {
      src: Main11,
    },
    {
      src: Main12,
    },
    {
      src: Main13,
    },
    {
      src: Main14,
    },
  ]

  // 이전, 다음 버튼 이벤트핸들러
  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  // 페이지네이션 커스텀
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`
    },
  }

  return (
    <div className='relative'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={'fade'}
        navigation={{
          prevEl: '#prev_slide',
          nextEl: '#next_slide',
        }}
        loop={true}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        onSwiper={(e) => {
          setSwiper(e)
        }}
        pagination={pagination}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className='object-cover w-full h-[400px] select-none'
              src={image.src}
              alt={`배너 대표이미지 ${index + 1}`}
            />
            <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 이전, 다음 버튼 커스텀 */}
      <button className='absolute z-10 left-2 top-1/2' onClick={handlePrev}>
        <i className='text-size-title tablet:text-[2.5rem] transition-smooth'>
          <IoIosArrowBack fill='#111' />
        </i>
      </button>
      <button className='absolute z-10 right-2 top-1/2' onClick={handleNext}>
        <i className='text-size-title tablet:text-[2.5rem] transition-smooth'>
          <IoIosArrowBack className='rotate-180' fill='#111' />
        </i>
      </button>

      <style>
        {`
    .swiper-pagination-bullet {
      background-color: #fff;
      transition: width 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      background-color: #ff5e2e;
      width: 20px;
      border-radius:20px;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
      </style>
    </div>
  )
}
