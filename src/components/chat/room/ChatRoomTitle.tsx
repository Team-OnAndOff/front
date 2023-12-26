import { HiOutlineChevronLeft } from 'react-icons/hi'
import { ChatRoomIcon } from '@/components/chat'
import { Link } from 'react-router-dom'

interface ChatRoomTitleProps {
  title: string
}
export default function ChatRoomTitle({ title }: ChatRoomTitleProps) {
  return (
    <div className='flex items-center py-3 border-b-2 border-neutral-200 relative h-16'>
      <Link to={`/chat`} className='inline-block h-11 items-center'>
        <ChatRoomIcon icon={HiOutlineChevronLeft} className='absolute' />
      </Link>
      <div className='text-neutral-700 font-semibold text-sm sm:text-base md:text-lg w-full px-10 md:px-14 truncate'>
        {title}
      </div>
    </div>
  )
}
