import {
  DropDownItems,
  ChatRoomTime,
  ChatRoomImage,
  ChatRoomMessageContent,
} from '@/components/chat'
import { ChatMessage } from '@/types'
import { formatDateTime } from '@/utils'
import { useState } from 'react'

interface ChatRoomMessageProps {
  item: ChatMessage
}

export default function ChatRoomMessage({ item }: ChatRoomMessageProps) {
  const [isOpen, setIsOpen] = useState(false)

  const isSelf = item.user.userId === Number(localStorage.getItem('userId')!)
  return (
    <div className='chat-message'>
      <div className={`flex items-end ${isSelf && 'justify-end'}`}>
        <ChatRoomMessageContent isSelf={isSelf} message={item.message} />
        {!isSelf && (
          <div className='relative'>
            <ChatRoomImage
              onClick={() => {
                setIsOpen((prev) => !prev)
              }}
            />
            <DropDownItems isOpen={isOpen} />
          </div>
        )}
        <ChatRoomTime isSelf={isSelf} time={formatDateTime(item.createdAt)} />
      </div>
    </div>
  )
}
