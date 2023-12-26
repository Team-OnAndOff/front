import { Outlet, useNavigate } from 'react-router-dom'
import { BsChat } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import socket from '@/utils/socket'
import { CHAT, ChatRoom } from '@/types'
import { ChatListCard } from '@/components/chat'
import { fetchGetChatRooms } from '@/api/chat'
import useAuthStore from '@/store/userStore'

export default function ChatLayout() {
  const { user } = useAuthStore()
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [selectedRoomId, setSelectedRoomId] = useState(0)

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      return
    }

    const fetchRooms = async () => {
      const rooms = await fetchGetChatRooms(user.id)
      if (rooms) {
        setRooms(rooms)
      }
    }

    socket.connect()
    socket.on(CHAT.CONNECT, (response) => {
      if (response.connect) {
        console.log('--> 소켓에 연결되었습니다.')
      }
    })

    fetchRooms()
    return () => {
      socket.close()
    }
  }, [user])

  const handleSelectRoom = (id: number) => {
    setSelectedRoomId(id)
    navigate(`/chat/${id}`)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex-1 w-full lg:px-12 lg:my-8'>
        <h1 className='text-size-title lg:inline-flex gap-2 mt-4 font-semibold tracking-wide hidden'>
          <BsChat size={26} />
          <span>채팅</span>
        </h1>
        {rooms.length === 0 && (
          <div className='flex justify-center h-[900px] border-[1px] my-2 items-center'>
            채팅방이 없습니다.
          </div>
        )}
        {rooms.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-3 h-[900px] border-[1px] my-2'>
            <div className='flex flex-col w-full border-r-[1px] overflow-y-auto'>
              {rooms.map((room) => (
                <ChatListCard
                  key={room.id}
                  room={room}
                  selected={room.id === selectedRoomId}
                  onClick={handleSelectRoom}
                />
              ))}
            </div>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}
