import { useState } from 'react'
import {
  DropDownItems,
  ChatRoomImage,
  ChatRoomMessageContent,
} from '@/components/chat'
import { ChatMessage } from '@/types'

interface ChatRoomMessageProps {
  isSelf: boolean
  item: ChatMessage
}

export default function ChatRoomMessage({
  item,
  isSelf,
}: ChatRoomMessageProps) {
  const [isOpen, setIsOpen] = useState(false)
  // const [user, setUser] = useState(item.user)

  // useEffect(() => {
  //   socket.on(CHAT.USER_INFO, (response: ChatUser) => {
  //     console.log('Asdf')
  //     if (user._id.toString() === response._id.toString()) {
  //       setUser(response)
  //     }
  //   })
  // }, [])

  return (
    <div className='chat-message'>
      <div className={`flex items-end ${isSelf && 'justify-end'}`}>
        <ChatRoomMessageContent isSelf={isSelf} item={item} />
        {!isSelf && (
          <div className='relative'>
            <ChatRoomImage
              onClick={() => {
                setIsOpen((prev) => !prev)
              }}
              user={item.user}
            />
            <DropDownItems isOpen={isOpen} />
          </div>
        )}
      </div>
    </div>
  )
}
