import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { BsChat } from 'react-icons/bs'
import socket from '@/utils/socket'
import { CHAT, ChatRoom } from '@/types'
import { fetchGetChatRooms, fetchGetChatUser } from '@/api/chat'
import { ChatListCard } from '@/components/chat'
import useChatStore from '@/hooks/useChatStore'

export default function ChatLayout() {
  const path = useParams()
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const { setUser } = useChatStore()

  useEffect(() => {
    const fetchRoomsAndUser = async () => {
      const [rooms, user] = await Promise.all([
        fetchGetChatRooms(),
        fetchGetChatUser(),
      ])

      if (
        path.roomId &&
        !rooms.find((room) => room.room === Number(path.roomId))
      ) {
        alert('참여중이지 않은 모임에는 입장할 수 없습니다.')
        navigate('/')
      }

      setRooms(rooms)
      if (user) {
        setUser(user)
      }
    }

    fetchRoomsAndUser()
  }, [])

  useEffect(() => {
    const handleSocketConnect = () => {
      console.log('--> 소켓에 연결되었습니다.', socket.id)
    }

    socket.connect()
    socket.on(CHAT.CONNECT, handleSocketConnect)

    return () => {
      socket.disconnect()
      socket.off(CHAT.CONNECT, handleSocketConnect)
    }
  }, [path])

  const handleSelectRoom = (id: number) => {
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
            참여중인 모임이 없습니다.
          </div>
        )}
        {rooms.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-3 h-[900px] border-[1px] my-2'>
            <div className='flex flex-col w-full border-r-[1px] overflow-y-auto'>
              {rooms.map((room) => (
                <ChatListCard
                  key={room._id}
                  room={room}
                  selected={room.room === Number(path.roomId)}
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
