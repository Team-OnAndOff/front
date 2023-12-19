import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { MeetMemberCard } from '@/components/meeting'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface MeetMemberListProps {
  participatedMem: {
    userId: number
    memberImgUrl: string
    memberName: string
    memberIntroduce: string
    temperature: number
  }[]
}

export default function MeetMemberList({
  participatedMem,
}: MeetMemberListProps) {
  return (
    <>
      <div className='flex justify-between mt-3'>
        {participatedMem.length > 4 ? (
          <Swiper
            slidesPerView={4}
            modules={[Navigation]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            navigation
          >
            {participatedMem.map((member, index) => (
              <SwiperSlide key={index}>
                <MeetMemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          participatedMem.map((member, index) => (
            <MeetMemberCard key={index} member={member} />
          ))
        )}
      </div>
      <style>
        {`
        .swiper-button-prev::after,
        .swiper-button-next::after {
          color: #999999;
        }
        `}
      </style>
    </>
  )
}
