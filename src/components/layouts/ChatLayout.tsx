import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { BsChat } from 'react-icons/bs'
import socket from '@/utils/socket'
import { CHAT, ChatRoom } from '@/types'
import { fetchGetChatRooms, fetchGetChatUser } from '@/api/chat'
import { ChatListCard } from '@/components/chat'
import { useChatStore } from '@/hooks'

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
    <div className='w-full h-full py-10 smooth-color'>
      <h1 className='hidden gap-2 font-bold tracking-wide text-size-title chat-screen:inline-flex smooth-color smooth-transition'>
        <BsChat
          size={26}
          className='dark:fill-dark-light-color smooth-color fill-black-color'
        />
        <span className='text-black-color smooth-color dark:text-dark-light-color'>
          채팅
        </span>
      </h1>
      {rooms.length === 0 && (
        <div className='flex items-center justify-center my-2 text-black-color dark:text-dark-light-color'>
          참여중인 모임이 없습니다.
        </div>
      )}
      {rooms.length > 0 && (
        <div className='grid mt-5 rounded-big-radius grid-cols-1 chat-screen:grid-cols-3 border-[1px] chat-screen:h-[82vh] smooth-transition'>
          <div
            className={`${
              path.roomId ? 'hidden chat-screen:flex' : 'flex'
            } flex-col w-full border-r-[1px] overflow-y-auto smooth-transition`}
          >
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
  )
}
