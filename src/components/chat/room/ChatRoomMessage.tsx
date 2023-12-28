import { useEffect, useState } from 'react'
import socket from '@/utils/socket'
import {
  DropDownItems,
  ChatRoomImage,
  ChatRoomMessageContent,
} from '@/components/chat'
import { CHAT, ChatMessage, ChatUser } from '@/types'

interface ChatRoomMessageProps {
  isSelf: boolean
  item: ChatMessage
}

export default function ChatRoomMessage({
  item,
  isSelf,
}: ChatRoomMessageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(item.user)

  useEffect(() => {
    socket.on(CHAT.USER_INFO, (response: ChatUser) => {
      if (user._id.toString() === response._id.toString()) {
        setUser(response)
      }
    })
  }, [])

  return (
    <div className='chat-message'>
      <div className={`flex items-end ${isSelf && 'justify-end'}`}>
        <ChatRoomMessageContent
          isSelf={isSelf}
          item={item}
          username={user.username}
        />
        {!isSelf && (
          <div className='relative'>
            <ChatRoomImage
              onClick={() => {
                setIsOpen((prev) => !prev)
              }}
              user={user}
            />
            <DropDownItems isOpen={isOpen} />
          </div>
        )}
      </div>
    </div>
  )
}
