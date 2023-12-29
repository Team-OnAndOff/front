import { EventAppliesUser } from '@/types'
import { useNavigate } from 'react-router-dom'
import { FaRegSmile } from 'react-icons/fa'
import useAuthStore from '@/store/userStore'
import Swal from 'sweetalert2'

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
  const { user } = useAuthStore((state) => state)

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (user?.id === member.user.id) {
      Swal.fire({
        icon: 'error',
        text: '본인은 평가할 수 없습니다!',
        timer: 2000,
        confirmButtonColor: '#ff5e2e',
      })
    } else {
      openModal()
      findAttendeeId(member.user.id)
      findUserName(member.user.username)
    }
  }
  const navigate = useNavigate()

  const handleClickUser = () => {
    navigate(`/userinfo/${member.user.id}`)
  }

  return (
    <>
      {member && (
        <>
          <div className='flex mr-3 pointer flex-col p-1.5 border-2 border-dark-gray-color rounded w-full h-28 max-w-[230px]'>
            <button
              onClick={handleClickUser}
              className='flex w-full white basis-3/4'
            >
              <div className='space-pre'>
                <span className='text-size-subbody line-clamp-3 dark:text-dark-light-color smooth-color'>
                  {member.user.introduction}
                </span>
              </div>
            </button>

            <div className='flex items-center justify-between'>
              <button onClick={handleClickUser}>
                <div className='flex items-center'>
                  <img
                    alt={member.user.username}
                    src={member.user.image.uploadPath}
                    className='object-cover mr-1 w-[24px] h-[24px] rounded-big-radius'
                  />
                  <span className='text-size-subbody line-clamp-1 dark:text-dark-light-color smooth-color'>
                    {member.user.username}
                  </span>
                </div>
              </button>
              <div className='flex'>
                <button
                  className='cursor-pointer hover:scale-105'
                  onClick={handleIconClick}
                >
                  <i>
                    <FaRegSmile
                      size={20}
                      className='dark:fill-dark-light-color'
                    />
                  </i>
                </button>
                <div className='p-1 ml-2 bg-main-color dark:bg-sub-color rounded-button-radius'>
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
