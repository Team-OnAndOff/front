import { Link } from 'react-router-dom'

interface MemberCardProps {
  member: {
    userId: number
    memberIntroduce: string
    memberImgUrl: string
    temperature: number
    memberName: string
  }
}

export default function MeetMeberCard({ member }: MemberCardProps) {
  return (
    <>
      <Link to={`/userinfo/${member.userId}`}>
        <div className='flex pointer flex-col p-1.5 border-2 border-dark-gray-color rounded w-60 h-28'>
          <div className='basis-3/4'>
            <span className='text-size-subbody line-clamp-3'>
              {member.memberIntroduce}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <img
                alt={member.memberName}
                src={member.memberImgUrl}
                className='object-cover w-full mr-2 h-full max-w-[24px] max-h-[24px] rounded-big-radius'
              />
              <span className='text-size-subbody'>{member.memberName}</span>
            </div>
            <div className='w-[30px] h-[20px] bg-main-color rounded-button-radius p-1'>
              <p className='font-normal text-center text-white text-size-subbody'>
                {member.temperature}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
