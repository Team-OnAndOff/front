import { HiOutlineChevronLeft } from 'react-icons/hi'
import { ChatRoomIcon, DropDownItems } from '@/components/chat'
import { Link } from 'react-router-dom'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { useState } from 'react'
import { ChatRoom } from '@/types'

interface ChatRoomTitleProps {
  room: ChatRoom
}

export default function ChatRoomTitle({ room }: ChatRoomTitleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex items-center border-b-2 border-neutral-200 relative h-16'>
      <Link to={`/chat`} className='inline-block h-11 items-center'>
        <ChatRoomIcon icon={HiOutlineChevronLeft} className='absolute' />
      </Link>
      <div className='text-neutral-700 font-semibold text-sm sm:text-base md:text-lg w-full px-10 md:px-14 truncate'>
        {room.name}
      </div>
      <div className='relative'>
        <ChatRoomIcon
          icon={FaEllipsisVertical}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <DropDownItems isOpen={isOpen} items={room.users} />
      </div>
    </div>
  )
}
