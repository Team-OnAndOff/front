import {
  ChatBadge,
  ChatRoomInput,
  ChatRoomMessage,
  ChatRoomTitle,
} from '@/components/chat'
import { ChatMessage, ChatResponse, ChatUser } from '@/types'
import socket from '@/utils/socket'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Chat() {
  const path = useLocation()
  const roomId = path.pathname.split('/')[2]

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<ChatUser | null>(null)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<ChatMessage[]>([])

  useEffect(() => {
    socket.emit(
      'getPrevMessages',
      roomId,
      (response: ChatResponse<ChatMessage[]>) => {
        if (response.code === 200 && response.data) {
          setItems(response.data)
        } else {
          console.log('Failed to get previous messages', response)
        }
      },
    )
  }, [roomId])

  useEffect(() => {
    socket.emit(
      'login',
      { id: Number(localStorage.getItem('userId')!) },
      (response: ChatResponse<ChatUser>) => {
        if (response.code === 200) {
          setUser(user)

          socket.emit(
            'joinRoom',
            (Number(localStorage.getItem('userId')!), roomId),
            (response: ChatResponse<null>) => {
              if (response && response.code === 200) {
                console.log('successfully join', response)
              } else {
                console.log('fail to join', response)
              }
            },
          )
        }
      },
    )

    socket.on('message', (response: ChatMessage) => {
      setItems((prev) => prev.concat(response))
    })

    return () => {
      socket.off('message')
    }
  }, [roomId])

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    socket.emit(
      'sendMessage',
      { message, roomId },
      (response: ChatResponse<null>) => {
        console.log('sendMessage res', response)
      },
    )
  }

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [items])

  return (
    <>
      <div className='flex-col justify-between h-screen lg:h-full p-2 overflow-y-auto lg:flex lg:col-span-2 z-50 '>
        <ChatRoomTitle />

        <div
          ref={chatContainerRef}
          className='flex flex-col flex-1 p-1 space-y-4 overflow-y-auto sm:p-4	'
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.type === 'system' ? (
                <ChatBadge text={item.message} />
              ) : (
                <ChatRoomMessage item={item} />
              )}
              <div ref={messageEndRef}></div>
            </div>
          ))}
        </div>

        <ChatRoomInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </>
  )
}
