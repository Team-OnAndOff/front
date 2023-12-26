import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination, Navigation } from 'swiper/modules'
import { Card } from '@/components/common'
import { CardData } from '@/types'
import CardBtn from './CardBtn'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

interface StateNumber {
  selectedTab: number
}

export default function SwiperCard({ selectedTab }: StateNumber) {
  const [data, setData] = useState([])
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 파일 경로
        const response = await fetch('http://localhost:4000/api/events')
        const jsonData = await response.json()
        // console.log(jsonData.data)
        // 불러온 데이터를 상태에 설정
        setData(jsonData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  // 이전, 다음 버튼 이벤트핸들러
  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  return (
    <>
      {data.length == 0 ? (
        <div className='p-[15%] text-center'>
          <p className='mb-5 font-bold text-size-body'>
            참여중인 모임이 없어요.
          </p>
          <Link to='/meetup-lists/1'>
            <p className='text-white bg-main-color py-[3%] rounded-button-radius w-[50%] mx-auto'>
              모임 구경하기
            </p>
          </Link>
        </div>
      ) : (
        <div className='relative'>
          <button
            className='absolute top-1/2 -left-[50px]'
            onClick={handlePrev}
          >
            <i className='text-size-title tablet:text-[2rem] text-black-color'>
              <IoIosArrowBack />
            </i>
          </button>
          <button
            className='absolute top-1/2 -right-[50px]'
            onClick={handleNext}
          >
            <i className='text-size-title tablet:text-[2rem] text-black-color'>
              <IoIosArrowBack className='rotate-180' />
            </i>
          </button>

          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            freeMode={true}
            loop={true}
            onSwiper={(e) => {
              setSwiper(e)
            }}
            navigation={{
              prevEl: '#prev_slide',
              nextEl: '#next_slide',
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className='w-full h-full mt-5 mySwiper'
          >
            {data.map((item: CardData) => (
              <SwiperSlide
                className='flex flex-col items-center justify-center text-center bg-white text-18'
                key={item.id}
              >
                <Card data={item} />
                <CardBtn selectedTab={selectedTab} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  )
}
