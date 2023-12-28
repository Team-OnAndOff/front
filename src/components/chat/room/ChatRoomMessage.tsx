import { ChatRoomImage, ChatRoomMessageContent } from '@/components/chat'
import { ChatMessage } from '@/types'

interface ChatRoomMessageProps {
  isSelf: boolean
  item: ChatMessage
}

export default function ChatRoomMessage({
  item,
  isSelf,
}: ChatRoomMessageProps) {
  // const [isOpen, setIsOpen] = useState(false)
  // const [user, setUser] = useState(item.user)

  // useEffect(() => {
  //   socket.on(CHAT.USER_INFO, (response: ChatUser) => {
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
            <ChatRoomImage user={item.user} />
          </div>
        )}
      </div>
    </div>
  )
}
