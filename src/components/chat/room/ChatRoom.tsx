import {
  ChatRoomInput,
  ChatRoomTitle,
  ChatRoomMessage,
} from '@/components/chat'

export default function ChatRoomIcon() {
  return (
    <div className='p-2 justify-between flex-col h-full hidden lg:flex lg:col-span-2 overflow-y-auto'>
      <ChatRoomTitle />

      <div className='flex flex-col flex-1 space-y-4 p-1 sm:p-4 overflow-y-auto'>
        {Array.from({ length: 50 }).map((_, i) => (
          <ChatRoomMessage
            isSelf={i % 4 === 0}
            message='채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.'
          />
        ))}
      </div>

      <ChatRoomInput />
    </div>
  )
}
