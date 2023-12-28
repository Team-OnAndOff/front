import { DropDownItem } from '@/components/chat'
import { CHAT, ChatRoom } from '@/types'
import socket from '@/utils/socket'
import { useEffect, useState } from 'react'

interface DropDownItemsProps {
  isOpen: boolean
  room: ChatRoom
}
export default function DropDownItems({ isOpen, room }: DropDownItemsProps) {
  const [item, setItem] = useState(room)
  useEffect(() => {
    socket.on(CHAT.ROOM_INFO, ({ room }: { room: ChatRoom }) => {
      if (item._id.toString() === room._id.toString()) {
        setItem(room)
      }
    })
  }, [room, setItem, item])

  return (
    <div
      className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <ul
        className='py-2 text-sm text-gray-700 dark:text-gray-200'
        aria-labelledby='dropdownMenuIconButton'
      >
        {item.users?.map((item, index) => (
          <DropDownItem key={index} item={item} />
        ))}
      </ul>
    </div>
  )
}
