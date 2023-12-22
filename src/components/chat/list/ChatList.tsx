import { ChatListCard } from '@/components/chat'

export default function ChatList() {
  return (
    <div className='flex flex-col w-full border-r-[1px] overflow-y-auto'>
      <ChatListCard />
      <ChatListCard />
      <ChatListCard />
      <ChatListCard />
    </div>
  )
}
