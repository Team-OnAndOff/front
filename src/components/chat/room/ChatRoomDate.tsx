import { formatDate } from '@/utils'

interface ChatRoomDateProps {
  date: Date
}

export default function ChatRoomDate({ date }: ChatRoomDateProps) {
  return (
    <span className='flex text-xs text-neutral-500 justify-center'>
      {formatDate(date)}
    </span>
  )
}
