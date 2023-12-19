import { ChatBadge, ChatMessageCount } from '@/components/chat'

export default function ChatListCard() {
  return (
    <div className='flex flex-row gap-2 py-4 px-2 justify-start items-center border-b-[1px] hover:bg-main-light-color cursor-pointer relative'>
      <div className='relative'>
        <img
          src='https://elice-project-02.s3.ap-northeast-2.amazonaws.com/events/1702812443501-asdf.png'
          className='object-cover h-12 w-12 rounded-full'
          alt='image'
        />
        <span className='absolute bottom-[-10px] w-full'>
          <ChatBadge text='챌린저' xs />
        </span>
      </div>
      <div className='flex flex-col max-w-xs'>
        <div className='text-sm sm:text-md font-semibold truncate'>
          파이썬에 대해 같이 얘기 나누실 분~
        </div>
        <span className='text-neutral-500 text-xs font-semibold truncate'>
          마지막 메세지 내용
        </span>
      </div>
      <ChatMessageCount count={1000} />
    </div>
  )
}