import { fetchGetRecruitEvents } from '@/api/event'
import { ChatBadge, ChatMessageCount } from '@/components/chat'
import { ChatRoom, RecruitData } from '@/types'
import { useEffect, useState } from 'react'

interface ChatListCardProps {
  room: ChatRoom
  selected: boolean
}

export default function ChatListCard({ room, selected }: ChatListCardProps) {
  const [item, setItem] = useState<RecruitData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetRecruitEvents(room.groupId)
      setItem(response)
    }
    fetchData()
  }, [])

  return (
    <>
      {item && (
        <div
          className={`flex flex-row gap-2 py-4 px-2 justify-start items-center border-b-[1px]  cursor-pointer relative ${
            selected ? 'bg-orange-200' : 'hover:bg-main-light-color'
          }`}
        >
          <div className='relative'>
            <img
              src='https://elice-project-02.s3.ap-northeast-2.amazonaws.com/events/1702812443501-asdf.png'
              className='object-cover h-12 w-12 rounded-full'
              alt='image'
            />
            {item.category.parentId?.name && (
              <span className='absolute bottom-[-10px] w-full'>
                <ChatBadge text={item.category.parentId?.name} xs />
              </span>
            )}
          </div>
          <div className='flex flex-col max-w-xs'>
            <div className='text-sm sm:text-md font-semibold truncate'>
              {item.title}
            </div>
            <span className='text-neutral-500 text-xs font-semibold truncate'>
              마지막 메세지 내용
            </span>
          </div>
          <ChatMessageCount count={1000} />
        </div>
      )}
    </>
  )
}
