import { HiOutlineChevronLeft } from 'react-icons/hi'
import { ChatRoomIcon } from '@/components/chat'

export default function ChatRoomTitle() {
  return (
    <div className='flex items-center py-3 border-b-2 border-neutral-200 relative'>
      <ChatRoomIcon
        icon={HiOutlineChevronLeft}
        onClick={() => {}}
        className='absolute'
      />
      <div className='text-neutral-700 font-semibold text-sm sm:text-size-body md:text-lg w-full px-10 md:px-14 truncate'>
        파이썬에 대해 같이 얘기 나누실 분~파이썬에 대해 같이 얘기 나누실
        분~파이썬에 대해 같이 얘기 나누실 분~파이썬에 대해 같이 얘기 나누실
        분~파이썬에 대해 같이 얘기 나누실 분~
      </div>
    </div>
  )
}
