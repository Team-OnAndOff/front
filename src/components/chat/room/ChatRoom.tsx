import {
  ChatRoomInput,
  ChatRoomTitle,
  ChatRoomMessage,
  ChatBadge,
} from '@/components/chat'

export default function ChatRoomIcon() {
  return (
    <div className='flex-col justify-between hidden h-full p-2 overflow-y-auto lg:flex lg:col-span-2'>
      <ChatRoomTitle />

      <div className='flex flex-col flex-1 p-1 space-y-4 overflow-y-auto sm:p-4'>
        <ChatBadge text='2023년 12월 19일' />
        {Array.from({ length: 50 }).map((_, i) => (
          <ChatRoomMessage
            key={i}
            isSelf={i % 4 === 0}
            message='채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.채팅 내용 입니다.'
          />
        ))}
      </div>

      <ChatRoomInput />
    </div>
  )
}
