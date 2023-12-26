import { IconType } from 'react-icons'

interface ChatRoomIconProps {
  icon: IconType
  className?: string
}

export default function ChatRoomIcon({
  icon: Icon,
  className,
}: ChatRoomIconProps) {
  return (
    <button
      type='button'
      className={`inline-flex items-center justify-center rounded-full h-10 w-10 hover:bg-neutral-300 ${className}`}
    >
      <Icon size={24} />
    </button>
  )
}
