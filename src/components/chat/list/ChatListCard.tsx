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
      className={`flex flex-row gap-2 py-4 px-2 justify-start items-center border-b-[1px] cursor-pointer relative ${
        selected
          ? 'bg-orange-200 dark:bg-dark-main-color/[0.1]'
          : 'hover:bg-main-light-color hover:dark:bg-dark-light-color/[0.1] dark:text-dark-main-color smooth-color'
      }`}
      onClick={() => onClick(item.room)}
    >
      <div className='relative h-[52px] w-[52px]'>
        <img
          src={item.image}
          className='object-cover h-[52px] w-[52px] rounded-full'
          alt='image'
        />
        {item.category && (
          <span className='absolute bottom-[-10px] w-full'>
            <ChatBadge text={item.category} xs />
          </span>
        )}
      </div>
      <div className='flex flex-col w-[70%]'>
        <span className='text-sm font-semibold truncate smooth-color dark:text-dark-light-color dark:font-light text-black-color tablet:text-size-body '>
          {item.name}
        </span>
        <span className='mt-2 ml-3 text-sm font-semibold truncate smooth-color text-black-color dark:text-dark-light-color'>
          {item.lastMessage}
        </span>
      </div>
      <div className='absolute inline-block text-xs top-2 right-2 text-neutral-500'>
        {item.users.length}명 참여중
      </div>
      {/* <ChatMessageCount count={1000} /> */}
    </div>
  )
}
