import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardSkeleton() {
  return (
    <div
      className={
        'relative flex desktop:flex-col justify-between desktop:pb-2 flex-row rounded-button-radius desktop:gap-y-10 gap-y-0 tablet:gap-x-10 gap-x-6 w-full transition-all duration-[1000ms] ease-in-out'
      }
    >
      {/* 이미지 영역 */}
      <div className='relative flex justify-center aspect-w-1 aspect-h-1 w-[14rem] desktop:max-w-[32rem] desktop:w-full mb-10 desktop:mb-0'>
        <div className='w-full h-36 desktop:h-[14vw]'>
          <Skeleton
            className='object-cover w-full h-full min-w-[230px] cursor-pointer rounded-image-radius'
            height={'h-[14vw]'}
          />
        </div>
        {/* 방장 프로필 이미지 */}
        <Skeleton className='absolute w-12 h-12 rounded-full -bottom-6 drop-shadow-xl right-2 desktop:-bottom-6 desktop:right-5' />
      </div>
      {/* 텍스트 영역 */}
      <div className='flex flex-col justify-between flex-1 desktop:px-3 desktop:-mt-5 desktop:gap-y-3'>
        <div>
          <Skeleton className='h-2 w-36' />
          <Skeleton className='w-full h-6' />
        </div>
        {/* 태그 */}
        <div className='w-full'>
          {/* 크루/챌린지스 */}
          {/* 챌린지 기간 */}
          <div className='flex gap-x-1'>
            <Skeleton className='w-8 h-3' />
            <Skeleton className='w-8 h-3' />
            <Skeleton className='w-8 h-3' />
          </div>
          <Skeleton className='w-10 h-3' />
          <div className='flex justify-between w-full'>
            <Skeleton className='w-20 h-2' />
            <Skeleton className='w-12 h-4' />
          </div>
        </div>
      </div>
    </div>
  )
}
