import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination, Navigation } from 'swiper/modules'
import { MyPageCard } from '@/components/common'
import { CardData } from '@/types'
import CardBtn from './CardBtn'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

interface StateNumber {
  selectedTab: number
  swiperData: string[] | undefined
}

export default function SwiperCard({ selectedTab, swiperData }: StateNumber) {
  const [data, setData] = useState()
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  console.log(swiperData, `swiperData`)
  // 이전, 다음 버튼 이벤트핸들러
  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  // return (
  //   <>
  //     {/* {data?.pending.length == 0 && (
  //       <div className='p-[15%] text-center'>
  //         <p className='mb-5 font-bold text-size-body'>
  //           참여중인 모임이 없어요.
  //         </p>
  //         <Link to='/meetup-lists/1'>
  //           <p className='text-white bg-main-color py-[3%] rounded-button-radius w-[50%] mx-auto'>
  //             모임 구경하기
  //           </p>
  //         </Link>
  //       </div>
  //     )} */}
  //     <div className='relative'>
  //       <button className='absolute top-1/2 -left-[50px]' onClick={handlePrev}>
  //         <i className='text-size-title tablet:text-[2rem] text-black-color'>
  //           <IoIosArrowBack />
  //         </i>
  //       </button>
  //       <button className='absolute top-1/2 -right-[50px]' onClick={handleNext}>
  //         <i className='text-size-title tablet:text-[2rem] text-black-color'>
  //           <IoIosArrowBack className='rotate-180' />
  //         </i>
  //       </button>

  //       <Swiper
  //         spaceBetween={20}
  //         freeMode={true}
  //         loop={true}
  //         speed={2000}
  //         slideToClickedSlide={true}
  //         // loopedSlides={2}
  //         slidesPerView={1}
  //         onSwiper={(e) => {
  //           setSwiper(e)
  //         }}
  //         navigation={{
  //           prevEl: '#prev_slide',
  //           nextEl: '#next_slide',
  //         }}
  //         modules={[FreeMode, Pagination, Navigation]}
  //         className='w-full h-full mt-5 mySwiper'
  //         breakpoints={{
  //           1740: {
  //             slidesPerView: 3,
  //             spaceBetween: 30,
  //             slidesPerGroupSkip: 1,
  //           },
  //           1120: {
  //             slidesPerView: 2,
  //             spaceBetween: 20,
  //             slidesPerGroupSkip: 1,
  //           },
  //         }}
  //       >
  //         {swiperData?.map((item) => (
  //           <SwiperSlide
  //             key={item.event.id}
  //             className='flex flex-col justify-center'
  //           >
  //             <MyPageCard data={item} />
  //             <CardBtn selectedTab={selectedTab} />
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //     </div>
  //   </>
  // )
}
