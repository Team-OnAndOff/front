import { IconType } from 'react-icons'

interface ChatRoomIconProps {
  icon: IconType
  className?: string
  onClick?: () => void
}

export default function ChatRoomIcon({
  icon: Icon,
  className,
  onClick,
}: ChatRoomIconProps) {
  return (
    <button
      type='button'
      className={`inline-flex items-center justify-center rounded-full h-10 w-10 hover:bg-neutral-300 ${className}`}
      onClick={onClick}
    >
      <Icon size={24} className='fill-black-color dark:fill-dark-light-color' />
    </button>
  )
}
