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
      const handleSocketConnect = () => {
        console.log('--> 소켓에 연결되었습니다.')
      }

      socket.on(CHAT.CONNECT, handleSocketConnect)
      socket.emit(
        CHAT.ROOM_JOIN,
        { roomId: room._id },
        (response: ChatResponse) => {
          console.log(response)
          setIsNext(true)
        },
      )
      setIsScrollToBottom(true)
      return () => {
        socket.off(CHAT.CONNECT, handleSocketConnect)
      }
    }
  }, [room])

  useEffect(() => {
    socket.on(
      CHAT.PREV_MESSAGES,
      ({ messages }: { messages: ChatMessage[] }) => {
        setItems(messages)
      },
    )

    socket.on(CHAT.MESSAGE, ({ message }: { message: ChatMessage }) => {
      console.log('message', message)
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
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`
    if (messageEndRef.current && isScrollToBottom) {
      messageEndRef.current.scrollIntoView()
    }
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [items, isScrollToBottom])

  return (
    <>
      {room && user && (
        <div className='flex-col h-screen overflow-y-auto lg:h-full p-2 lg:flex lg:col-span-2 z-50 relative'>
          <ChatRoomTitle title={room.name} />
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
