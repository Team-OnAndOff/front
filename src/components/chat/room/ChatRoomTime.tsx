interface ChatRoomTimeProps {
  isSelf: boolean
  time: string
}

export default function ChatRoomTime({ isSelf, time }: ChatRoomTimeProps) {
  return (
    <span
      className={`text-xs text-neutral-500 ${isSelf ? 'order-1' : 'order-2'}`}
    >
      {time}
    </span>
  )
}
