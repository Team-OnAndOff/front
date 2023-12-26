import { fetchGetRecruitEvents } from '@/api/event'
import {
  ChatBadge,
  ChatRoomInput,
  ChatRoomMessage,
  ChatRoomTitle,
} from '@/components/chat'
import useAuthStore from '@/store/userStore'

import { CHAT, ChatMessage, RecruitData } from '@/types'
import socket from '@/utils/socket'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Chat() {
  const { user } = useAuthStore()
  const params = useParams()
  const roomId = params.roomId
  // const users = [1, 2, 3, 4, 12]

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<ChatMessage[]>([])
  const [item, setItem] = useState<RecruitData | null>(null)
  useEffect(() => {
    const fetchGetRoom = async () => {
      if (roomId) {
        const data = await fetchGetRecruitEvents(Number(roomId))
        setItem(data)
      }
    }
    fetchGetRoom()
  }, [roomId])

  useEffect(() => {
    socket.on(
      CHAT.ENTERED,
      (response: { roomId: string; messages: ChatMessage[] }) => {
        setItems(response.messages)
      },
    )

    socket.on(CHAT.MESSAGE, (response: ChatMessage) => {
      console.log('zz')
      setItems((prev) => [...prev, response])
    })

    socket.on('read', (data) => {
      const { messages } = data
      setItems((prev) => [...messages, ...prev])
    })
  }, [])

  useEffect(() => {
    socket.emit(CHAT.JOIN_ROOM, { roomId })
  }, [roomId])

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    socket.emit(CHAT.MESSAGE, { message })
  }

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`

    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView()
    }
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [items])

  const test = () => {
    socket.emit('read', { roomId, message: items[0] })
  }

  return (
    <>
      {item && (
        <div className='flex-col h-screen overflow-y-auto lg:h-full p-2 lg:flex lg:col-span-2 z-50 '>
          <ChatRoomTitle title={item.title} />
          <div
            ref={chatContainerRef}
            className='flex flex-1 p-1 overflow-auto gap-2 sm:p-4 flex-col'
          >
            {items.map((item, index) => (
              <div key={index}>
                {/* {item.type === 'system' ? (
                <ChatBadge text={item.message} />
              ) : ( */}
                <ChatRoomMessage item={item} />
                {/* )} */}
                <div ref={messageEndRef}></div>
              </div>
            ))}
          </div>
          <button onClick={test}>이전</button>
          <ChatRoomInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </>
  )
}
