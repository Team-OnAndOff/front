import { HiOutlineChevronLeft } from 'react-icons/hi'
import { ChatRoomIcon, DropDownItems } from '@/components/chat'
import { Link } from 'react-router-dom'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { ChatRoom, ChatUser } from '@/types'

interface ChatRoomTitleProps {
  room: ChatRoom
  users: Map<string, ChatUser>
}

export default function ChatRoomTitle({ room, users }: ChatRoomTitleProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [room])

  return (
    <div className='sticky top-0 items-center w-full py-2 border-b-2 lg:absolute border-neutral-200'>
      <div className='relative flex items-center'>
        <Link to={`/chat`} className='items-center inline-block h-11'>
          <ChatRoomIcon icon={HiOutlineChevronLeft} className='absolute' />
        </Link>
        <div className='w-full px-10 text-sm font-semibold truncate text-black-color dark:text-dark-light-color sm:text-base md:text-lg md:px-14'>
          {room.name}
        </div>
        <div className='relative'>
          <ChatRoomIcon
            icon={FaEllipsisVertical}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <DropDownItems isOpen={isOpen} users={users} />
        </div>
      </div>
    </div>
  )
}
