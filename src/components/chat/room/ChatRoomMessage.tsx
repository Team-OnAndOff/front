import { ChatRoomImage, ChatRoomTime } from '@/components/chat'
import { ChatMessage, ChatUser } from '@/types'
import { formatDateTime } from '@/utils'

interface ChatRoomMessageProps {
  isSelf: boolean
  item: ChatMessage
  users: Map<string, ChatUser>
}

export default function ChatRoomMessage({
  item,
  isSelf,
  users,
}: ChatRoomMessageProps) {
  const user = users.get(item.user._id) ?? item.user
  return (
    <div className='chat-message'>
      <div className={`flex items-end ${isSelf && 'justify-end'}`}>
        <div className='flex flex-col space-y-1 text-xs max-w-xs mx-2 items-start order-2'>
          {!isSelf && <span>{user.username}</span>}
          <div className='flex gap-1 items-end'>
            <div
              className={`px-4 py-2 rounded-lg inline-block ${
                isSelf
                  ? 'bg-main-color text-main-light-color order-3'
                  : 'bg-neutral-100 text-neutral-600 order-1'
              }`}
            >
              {item.message}
            </div>
            {/* <span
              className={`text-main-color font-semibold ${
                isSelf ? 'order-1' : 'order-3'
              }`}
            >
              {cnt}
            </span> */}
            <ChatRoomTime
              isSelf={isSelf}
              time={formatDateTime(item.createdAt)}
            />
          </div>
        </div>
        {!isSelf && (
          <div className='relative'>
            <ChatRoomImage user={user} />
          </div>
        )}
      </div>
    </div>
  )
}
