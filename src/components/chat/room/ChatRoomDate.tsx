import { formatDate } from '@/utils'

interface ChatRoomDateProps {
  date: Date
}

export default function ChatRoomDate({ date }: ChatRoomDateProps) {
  return (
    <span className='flex justify-center my-6 text-xs text-neutral-500'>
      {formatDate(date)}
    </span>
  )
}
