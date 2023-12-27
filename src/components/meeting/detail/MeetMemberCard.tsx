import { EventAppliesUser } from '@/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegSmile } from 'react-icons/fa'
import { Modal } from '@/components/common'
import Evaluation from '../mypage/Evaluation'
interface MemberCardProps {
  member: EventAppliesUser
}

export default function MeetMeberCard({ member }: MemberCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className='flex mr-3 pointer flex-col p-1.5 border-2 border-dark-gray-color rounded w-60 h-28'>
        <Link to={`/userinfo/${member?.user.id}`} className='basis-3/4'>
          <div className='whitespace-pre basis-3/4'>
            <span className='text-size-subbody line-clamp-3'>
              {member?.user.introduction}
            </span>
          </div>
        </Link>

        <div className='flex items-center justify-between'>
          <Link to={`/userinfo/${member?.user.id}`}>
            <div className='flex items-center min-w-[160px]'>
              <img
                alt={member?.user.username}
                src={member?.user.image.uploadPath}
                className='object-cover w-full mr-1 h-full max-w-[24px] max-h-[24px] rounded-big-radius'
              />
              <span className='text-size-subbody line-clamp-1'>
                {member?.user.username}
              </span>
            </div>
          </Link>
          <div className='flex'>
            <i
              className='transition ease-in-out cursor-pointer hover:scale-110'
              onClick={openModal}
            >
              <FaRegSmile size={20} />
            </i>
            <div className='w-[30px] h-[20px] ml-2 bg-main-color rounded-button-radius p-1'>
              <p className='font-normal text-center text-white text-size-subbody'>
                36.5
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <Evaluation
            username={member?.user.username}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </>
  )
}
