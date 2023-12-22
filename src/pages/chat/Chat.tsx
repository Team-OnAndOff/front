import { BsChat } from 'react-icons/bs'
import { ChatList, ChatRoom } from '@/components/chat'

export default function Chat() {
  return (
    <>
      <h1 className='text-size-title inline-flex gap-2 mt-4 font-semibold tracking-wide'>
        <BsChat size={26} />
        <span>채팅</span>
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 h-[900px] max-h-screen border-[1px] my-2'>
        <ChatList />
        <ChatRoom />
      </div>
    </>
  )
}
