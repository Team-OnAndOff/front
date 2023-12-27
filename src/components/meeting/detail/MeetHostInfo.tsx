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
      <div className='flex mt-3'>
        {/* 방장 프로필 */}

        <div className='flex flex-col items-center justify-end mr-7'>
          <div className='min-w-[200px] min-h-[200px]'>
            <Link to={`/userinfo/${hostId}`}>
              <img
                src={leaderImageUrl}
                className='object-cover w-full h-full max-w-[200px] max-h-[200px] rounded-full'
              />
            </Link>
          </div>
          <h5 className='text-size-body'>{leaderName}</h5>
        </div>

        {/* 방장자기소개 */}
        <div className='w-[calc(100%-200px)] rounded-big-radius overflow-y-auto border-2 border-dark-gray-color'>
          <p className='p-3.5 whitespace-pre'>{leaderIntroduce}</p>
        </div>
      </div>
    </>
  )
}
