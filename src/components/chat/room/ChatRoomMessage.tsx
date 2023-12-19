import {
  ChatRoomTime,
  ChatRoomImage,
  ChatRoomMessageContent,
} from '@/components/chat'

interface ChatRoomMessageProps {
  isSelf: boolean
  message: string
}

export default function ChatRoomMessage({
  isSelf,
  message,
}: ChatRoomMessageProps) {
  return (
    <div className='chat-message'>
      <div className={`flex items-end ${isSelf && 'justify-end'}`}>
        <ChatRoomMessageContent isSelf={isSelf} message={message} />
        {!isSelf && <ChatRoomImage />}
        <ChatRoomTime isSelf={isSelf} time={'17:00'} />
      </div>
    </div>
  )
}
