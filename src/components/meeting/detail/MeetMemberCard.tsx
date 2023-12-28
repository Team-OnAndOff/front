import { EventAppliesUser } from '@/types'
import { Link } from 'react-router-dom'
import { FaRegSmile } from 'react-icons/fa'
interface MemberCardProps {
  member: EventAppliesUser
  openModal: () => void
  findAttendeeId: (id: number) => void
  findUserName: (name: string) => void
}

export default function MeetMeberCard({
  member,
  openModal,
  findAttendeeId,
  findUserName,
}: MemberCardProps) {
  const handleIconClick = () => {
    openModal()
    findAttendeeId(member.user.id)
    findUserName(member.user.username)
  }
  return (
    <>
      {member && (
        <>
          <div className='flex mr-3 pointer flex-col p-1.5 border-2 border-dark-gray-color rounded w-full h-28'>
            <Link to={`/userinfo/${member.user.id}`} className='basis-3/4'>
              <div className='w-20 whitespace-pre '>
                <div className='w-full text-size-subbody line-clamp-3'>
                  {member.user.introduction}
                </div>
              </div>
            </Link>

            <div className='flex items-center justify-between'>
              <Link to={`/userinfo/${member.user.id}`}>
                <div className='flex items-center'>
                  <img
                    alt={member.user.username}
                    src={member.user.image.uploadPath}
                    className='object-cover mr-1 w-[24px] h-[24px] rounded-big-radius'
                  />
                  <span className='text-size-subbody line-clamp-1'>
                    {member.user.username}
                  </span>
                </div>
              </Link>
              <div className='flex'>
                <button
                  className='cursor-pointer hover:scale-105'
                  onClick={handleIconClick}
                >
                  <i>
                    <FaRegSmile size={20} />
                  </i>
                </button>
                <div className='p-1 ml-2 bg-main-color rounded-button-radius'>
                  <p className='font-light text-center text-white text-size-subbody'>
                    36.5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
