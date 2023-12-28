import { ChatUser } from '@/types'

interface ChatRoomImageProps {
  user: ChatUser
  onClick: () => void
}

export default function ChatRoomImage({ user, onClick }: ChatRoomImageProps) {
  return (
    <div onClick={onClick}>
      <img
        src={user.image}
        alt='profile'
        className='w-6 h-6 rounded-full cursor-pointer order-1'
      />
    </div>
  )
}
