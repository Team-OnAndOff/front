import { useEffect, useRef, useState } from 'react'
import {
  ChatBadge,
  ChatRoomDate,
  ChatRoomInput,
  ChatRoomMessage,
  ChatRoomTitle,
} from '@/components/chat'
import { CHAT, ChatMessage, ChatResponse } from '@/types'
import useChatStore from '@/hooks/useChatStore'
import socket from '@/utils/socket'
import { useIntersectionObserver } from '@/hooks'
import { fetchGetChatPrevMessages } from '@/api/chat'
import { formatDate } from '@/utils'

export default function Chat() {
  const messageEndRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<ChatMessage[]>([])

  const { user, room } = useChatStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isNext, setIsNext] = useState(false)
  const [isScrollToBottom, setIsScrollToBottom] = useState(false)
  const page = useRef(1)

  useEffect(() => {
    page.current = 1
    if (room) {
      socket.emit(
        CHAT.ROOM_JOIN,
        { roomId: room._id },
        (response: ChatResponse) => {
          console.log('ROOM_JOIN', response)
          setIsNext(true)
          setIsScrollToBottom(true)
        },
      )
    }
  }, [room])

  useEffect(() => {
    socket.on(
      CHAT.PREV_MESSAGES,
      ({ messages }: { messages: ChatMessage[] }) => {
        console.log('PREV_MESSAGES: ', messages)
        setItems(messages)
      },
    )

    socket.on(CHAT.MESSAGE, ({ message }: { message: ChatMessage }) => {
      console.log('MESSAGE', message)
      setItems((prev) => [message, ...prev])
    })

    socket.on(CHAT.USER_JOIN, ({ message }: { message: ChatMessage }) => {
      console.log('USER_JOIN', message)
      setItems((prev) => [message, ...prev])
    })
  }, [])

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message) {
      return
    }

    setMessage('')
    setIsScrollToBottom(true)
    if (user && room) {
      socket.emit(
        CHAT.SEND_MESSAGE,
        { userId: user._id, roomId: room._id, message },
        (response: ChatResponse) => {
          console.log('send message: ', response)
        },
      )
    }
  }

  const onIntersect: IntersectionObserverCallback = async ([
    { isIntersecting },
  ]) => {
    if (room && isIntersecting && !isLoading && isNext) {
      console.log('onIntersect: ')
      setIsLoading(true)
      const messages = await fetchGetChatPrevMessages(room?._id, page.current)
      page.current += 1
      if (messages.length === 0) {
        setIsNext(false)
      } else {
        setIsNext(true)
      }
      setIsScrollToBottom(false)
      setIsLoading(false)
      setItems((prev) => [...prev, ...messages])
    }
  }

  const { setTarget } = useIntersectionObserver({ onIntersect, threshold: 0.8 })

  useEffect(() => {
    if (messageEndRef.current && isScrollToBottom) {
      messageEndRef.current.scrollIntoView()
    }
  }, [items, isScrollToBottom])
  console.log(items)
  return (
    <>
      {room && user && (
        <div className='flex-col h-screen overflow-y-auto lg:h-full lg:flex lg:col-span-2 z-50 relative'>
          <ChatRoomTitle room={room} />
          <div className='flex flex-1 overflow-auto gap-2 sm:p-4 flex-col-reverse h-full relative'>
            <div ref={messageEndRef}></div>
            {items.map((item, index, arr) => (
              <div key={index}>
                {index === arr.length - 1 && (
                  <ChatRoomDate date={item.createdAt} />
                )}
                {index < arr.length - 1 &&
                  new Date(formatDate(item.createdAt)) >
                    new Date(formatDate(arr[index + 1].createdAt)) && (
                    <ChatRoomDate date={item.createdAt} />
                  )}

                {item.type === 'system' ? (
                  <ChatBadge text={item.message} />
                ) : (
                  <ChatRoomMessage
                    item={item}
                    isSelf={item.user?._id === user?._id}
                  />
                )}
              </div>
            ))}
            <div ref={setTarget} className='flex h-[60px] flex-shrink-0'>
              {isLoading && (
                <span className='block w-full text-center text-sm text-neutral-500'>
                  Loading.....
                </span>
              )}
            </div>
          </div>
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
