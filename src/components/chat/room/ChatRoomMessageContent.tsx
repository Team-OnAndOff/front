import { ChatMessage } from '@/types'
import { ChatRoomTime } from '@/components/chat'
import { formatDateTime } from '@/utils'

interface ChatMessageProps {
  isSelf: boolean
  item: ChatMessage
  username: string
}

export default function ChatMessageComponent({
  isSelf,
  item,
  username,
}: ChatMessageProps) {
  return (
    <div className='flex flex-col space-y-1 text-xs max-w-xs mx-2 order-2 items-start'>
      {!isSelf && <span>{username}</span>}
      <div className='flex gap-1 items-end'>
        <div
          className={`px-4 py-2 rounded-lg inline-block order-2 ${
            isSelf
              ? 'bg-main-color text-main-light-color'
              : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          {item.message}
        </div>
        <ChatRoomTime isSelf={isSelf} time={formatDateTime(item.createdAt)} />
      </div>
    </div>
  )
}
