import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layouts'
import { BsChat } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import socket from '@/utils/socket'
import { ChatRoom } from '@/types'
import { ChatListCard } from '@/components/chat'

export default function ChatLayout() {
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const location = useLocation()
  const path = location.pathname.split('/')[2]

  useEffect(() => {
    const fetchRooms = (response: ChatRoom[]) => {
      setRooms(response)
    }

    socket.connect()
    socket.on('rooms', fetchRooms)

    return () => {
      socket.off('rooms', fetchRooms)
      socket.close()
    }
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='flex-1 w-full lg:px-12 lg:my-8'>
        <h1 className='text-size-title lg:inline-flex gap-2 mt-4 font-semibold tracking-wide hidden'>
          <BsChat size={26} />
          <span>채팅</span>
        </h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 h-[900px] border-[1px] my-2'>
          <div className='flex flex-col w-full border-r-[1px] overflow-y-auto'>
            {rooms.map((room) => (
              <Link to={`${room._id}`} key={room._id}>
                <ChatListCard room={room} selected={room._id === path} />
              </Link>
            ))}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
