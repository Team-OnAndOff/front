import { ChatRoomImage, ChatRoomTime } from '@/components/chat'
import { ChatMessage } from '@/types'
import { formatDateTime } from '@/utils'

interface ChatRoomMessageProps {
  isSelf: boolean
  item: ChatMessage
}

export default function ChatRoomMessage({
  item,
  isSelf,
}: ChatRoomMessageProps) {
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
        <div className='flex flex-col space-y-1 text-xs max-w-xs mx-2 items-start order-2'>
          {!isSelf && <span>{item.user.username}</span>}
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
            <ChatRoomImage user={item.user} />
          </div>
        )}
      </div>
    </div>
  )
}
