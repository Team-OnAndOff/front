import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { CardBtn } from './CardBtn'
import { FreeMode, Pagination, Navigation } from 'swiper/modules'
import { CardData } from '@/types'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import MyPageCard from '@/components/common/MyPageCard'

interface StateNumber {
  selectedTab: number
  swiperData: CardData[] | undefined
  userId: number | string | undefined
  userMe: boolean | undefined
  setNewLoad: Dispatch<SetStateAction<boolean>>
}

export default function SwiperCard({
  selectedTab,
  swiperData,
  userMe,
  userId,
  setNewLoad,
}: StateNumber) {
  const [data, setData] = useState<CardData[] | undefined | null>(swiperData)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  console.log(swiperData, `swiperData`)
  // 이전, 다음 버튼 이벤트핸들러
  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  useEffect(() => {
    // swiperData가 변경될 때마다 내부 상태를 업데이트
    setData(swiperData)
  }, [swiperData, selectedTab, userId])

  return (
    <>
      {Array.isArray(data) && data.length === 0 && (
        <div className='p-[15%] text-center'>
          <p className='mb-5 font-bold text-size-body smooth-color dark:text-dark-light-color'>
            참여중인 모임이 없어요.
          </p>
          <Link to='/meetup-lists/1'>
            <p className='text-white bg-main-color dark:bg-sub-color smooth-color hover:dark:bg-sub-hover-color py-[3%] rounded-button-radius w-[50%] mx-auto'>
              모임 구경하기
            </p>
          </Link>
        </div>
      )}
      <div className='relative'>
        {data && data.length > 2 && (
          <>
            <button
              className='absolute top-1/2 -left-[50px]'
              onClick={handlePrev}
            >
              <i className='text-size-title tablet:text-[2rem] text-black-color'>
                <IoIosArrowBack className='dark:fill-dark-light-color smooth-color' />
              </i>
            </button>
            <button
              className='absolute top-1/2 -right-[50px]'
              onClick={handleNext}
            >
              <i className='text-size-title tablet:text-[2rem] text-black-color'>
                <IoIosArrowBack className='rotate-180 dark:fill-dark-light-color smooth-color' />
              </i>
            </button>
          </>
        )}

        <Swiper
          spaceBetween={20}
          freeMode={true}
          loop={false}
          speed={2000}
          slideToClickedSlide={true}
          slidesOffsetBefore={0}
          // loopedSlides={2}
          slidesPerView={1}
          onSwiper={(e) => {
            setSwiper(e)
          }}
          navigation={{
            prevEl: '#prev_slide',
            nextEl: '#next_slide',
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className='w-full h-full mt-5 mySwiper'
          breakpoints={{
            1740: {
              slidesPerView: 3,
              spaceBetween: 30,
              slidesPerGroupSkip: 1,
            },
            1120: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroupSkip: 1,
            },
          }}
        >
          {data?.map((item: CardData, index: number) => (
            <SwiperSlide key={index} className='flex flex-col justify-center'>
              <MyPageCard data={item.event} />
              <CardBtn
                selectedTab={selectedTab}
                data={item}
                userId={userId}
                userMe={userMe}
                setNewLoad={setNewLoad}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
