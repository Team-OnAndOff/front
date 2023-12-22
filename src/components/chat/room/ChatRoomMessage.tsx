import {
  DropDownItems,
  ChatRoomTime,
  ChatRoomImage,
  ChatRoomMessageContent,
} from '@/components/chat'
import { useState } from 'react'

interface ChatRoomMessageProps {
  isSelf: boolean
  message: string
}

export default function ChatRoomMessage({
  isSelf,
  message,
}: ChatRoomMessageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='chat-message'>
      <div className={`flex items-end ${isSelf && 'justify-end'}`}>
        <ChatRoomMessageContent isSelf={isSelf} message={message} />
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
        <ChatRoomTime isSelf={isSelf} time={'17:00'} />
      </div>
    </div>
  )
}
