import { Link } from 'react-router-dom'

interface MeetHostProps {
  leaderName?: string
  leaderImageUrl: string
  leaderIntroduce?: string
  hostId: number
}

export default function MeetHostInfo({
  leaderName,
  leaderImageUrl,
  leaderIntroduce,
  hostId,
}: MeetHostProps) {
  return (
    <>
      <div className='flex flex-col mt-3 transition-all duration-1000 tablet:flex-row tablet:gap-0 gap-y-3'>
        {/* 방장 프로필 */}
        <div className='flex flex-col transition-all duration-1000 tablet:items-center tablet:mr-7 tablet:gap-0 gap-y-2'>
          <div className='desktop:min-w-[180px] desktop:min-h-[180px] tablet:min-w-[140px] tablet:min-h-[140px] transition-all duration-1000 w-[140px] h-[140px]'>
            <Link to={`/userinfo/${hostId}`}>
              <img
                src={leaderImageUrl}
                className='object-cover w-full h-full tablet:w-full tablet:h-full tablet:max-w-[140px]
                tablet:max-h-[140px] desktop:max-w-[180px] desktop:max-h-[180px] rounded-full transition-all duration-1000'
              />
            </Link>
          </div>
          <h5 className='w-40 text-center text-size-body tablet:w-full'>
            {leaderName}
          </h5>
        </div>

        {/* 방장자기소개 */}
        <div className='tablet:w-[calc(100%-180px)] w-full rounded-big-radius overflow-y-auto border-2 border-sub-color tablet:h-auto h-40'>
          <p className='p-3.5 h- whitespace-pre-wrap h-40 dark:text-dark-light-color smooth-color'>
            {leaderIntroduce}
          </p>
        </div>
      </div>
    </>
  )
}
