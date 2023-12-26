import { IconType } from 'react-icons'

interface ChatRoomSendButtonProps {
  icon: IconType
}

export default function ChatRoomSendButton({
  icon: Icon,
}: ChatRoomSendButtonProps) {
  return (
    <button
      type='submit'
      className='inline-flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-main-color hover:bg-main-hover-color'
    >
      <span className='font-bold hidden sm:flex text-main-light-color'>
        Send
      </span>
      <Icon className='fill-main-light-color' size={18} />
    </button>
  )
}
