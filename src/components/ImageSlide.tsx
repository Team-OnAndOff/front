import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function ImageSlide() {
  const images = [
    {
      src: 'https://randompicturegenerator.com/img/people-generator/g846294a31ce69fb5a7c35f45e3c4a917e1448ac59b4514d8def85c9d0c34e79e4a42edfb2d4c142e9ff4889235f7dc95_640.jpg',
    },
    {
      src: 'https://randompicturegenerator.com/img/people-generator/g93cba33c199271afc9093ab785c9c112c2755189d534a55e70d3dfc633da7fc7f2bf105dba1088c76a396106fb473790_640.jpg',
    },
    {
      src: 'https://randompicturegenerator.com/img/people-generator/g48bbb088770f42532887c08f55575381936e2f3a1094b7a12bcc9dcbdef67a0308675bbdf6a6716de31bdfe711188b72_640.jpg',
    },
    {
      src: 'https://randompicturegenerator.com/img/people-generator/g8ce2dca76287a17421911ed8a95a299d9759f854d35faeb700ac8e7e51d7bcffecc118f2ca569dbd6188d24faba1ef4b_640.jpg',
    },
    {
      src: 'https://randompicturegenerator.com/img/people-generator/g9b088ea64c7f343c8b0aded228615a1d69f8f80e4ed3f739929271b5ab67e1aa10ea2f28c495314b9431cc804128e58f_640.jpg',
    },
  ]

  return (
    <div className='relative'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect={'fade'}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className='object-cover w-full h-[400px] select-none'
              src={image.src}
              alt={`배너 대표이미지 ${index + 1}`}
              loading='lazy'
            />
            <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .swiper-button-prev::after,
          .swiper-button-next::after {
            color: #FFF;
          }

          .swiper-pagination-bullet {
            background-color: #fff;
          }
          .swiper-pagination-bullet-active {
            background-color: #ff5e2e;
          }
        `}
      </style>
    </div>
  )
}
