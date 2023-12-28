import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { BsChat } from 'react-icons/bs'
import socket from '@/utils/socket'
import { ChatRoom } from '@/types'
import { fetchGetChatRooms, fetchGetChatUser } from '@/api/chat'
import { ChatListCard } from '@/components/chat'
import useChatStore from '@/hooks/useChatStore'

export default function ChatLayout() {
  const path = useParams()
  const navigate = useNavigate()

  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [selectedRoomId, setSelectedRoomId] = useState(Number(path.roomId) ?? 0)
  const { room, setUser, setRoom } = useChatStore()

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [room])

  useEffect(() => {
    const fetchRoomsAndUser = async () => {
      try {
        const [rooms, user] = await Promise.all([
          fetchGetChatRooms(),
          fetchGetChatUser(),
        ])

        setRooms(rooms)
        console.log(rooms)
        if (user) {
          setUser(user)
        }

        if (
          path.roomId &&
          !rooms.find((room) => room.room === Number(path.roomId))
        ) {
          alert('참여중이지 않은 모임에는 입장할 수 없습니다.')
          navigate('/')
        }
      } catch (error) {
        console.error('Error: ', error)
      }
    }

    fetchRoomsAndUser()
  }, [setUser, navigate, path])

  const handleSelectRoom = (id: number) => {
    const room = rooms.find((room) => room.room === id)
    if (room) {
      setRoom(room)
    }

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
                  selected={room.room === selectedRoomId}
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
