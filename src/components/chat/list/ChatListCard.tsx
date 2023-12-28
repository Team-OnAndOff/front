import { useEffect, useState } from 'react'
import socket from '@/utils/socket'
import { ChatBadge } from '@/components/chat'
import { CHAT, ChatRoom } from '@/types'

interface ChatListCardProps {
  room: ChatRoom
  selected: boolean
  onClick: (id: number) => void
}

export default function ChatListCard({
  room,
  selected,
  onClick,
}: ChatListCardProps) {
  const [item, setItem] = useState(room)

  useEffect(() => {
    socket.on(CHAT.ROOM_INFO, ({ room }: { room: ChatRoom }) => {
      if (item._id.toString() === room._id.toString()) {
        setItem(room)
      }
    })
  }, [item])

  return (
    <div
      className={`flex flex-row gap-2 py-4 px-2 justify-start items-center border-b-[1px]  cursor-pointer relative ${
        selected ? 'bg-orange-200' : 'hover:bg-main-light-color'
      }`}
      onClick={() => onClick(item.room)}
    >
      <div className='relative'>
        <img
          src={item.image}
          className='object-cover h-12 w-12 rounded-full'
          alt='image'
        />
        {item.category && (
          <span className='absolute bottom-[-10px] w-full'>
            <ChatBadge text={item.category} xs />
          </span>
        )}
      </div>
      <div className='flex flex-col max-w-xs w-full'>
        <div className='text-sm sm:text-size-body font-semibold truncate'>
          <div>{item.name}</div>
        </div>
        <span className='text-neutral-500 text-sm font-semibold truncate'>
          {item.lastMessage}
        </span>
      </div>
      <div className='absolute top-2 right-2 inline-block text-xs text-neutral-500'>
        {item.users.length}명 참여중
      </div>
      {/* <ChatMessageCount count={1000} /> */}
    </div>
  )
}
