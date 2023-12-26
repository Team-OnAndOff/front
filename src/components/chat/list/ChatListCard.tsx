import { ChatMessageCount } from '@/components/chat'
import { ChatRoom } from '@/types'

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
  return (
    <div
      className={`flex flex-row gap-2 py-4 px-2 justify-start items-center border-b-[1px]  cursor-pointer relative ${
        selected ? 'bg-orange-200' : 'hover:bg-main-light-color'
      }`}
      onClick={() => onClick(room.id)}
    >
      <div className='relative'>
        <img
          src={room.event.image.uploadPath}
          className='object-cover h-12 w-12 rounded-full'
          alt='image'
        />
        {/* {item.category.parentId?.name && (
          <span className='absolute bottom-[-10px] w-full'>
            <ChatBadge text={item.category.parentId?.name} xs />
          </span>
        )} */}
      </div>
      <div className='flex flex-col max-w-xs'>
        <div className='text-sm sm:text-size-body font-semibold truncate'>
          {room.event.title}
        </div>
        <span className='text-neutral-500 text-xs font-semibold truncate'>
          마지막 메세지 내용
        </span>
      </div>
      <ChatMessageCount count={1000} />
    </div>
  )
}
