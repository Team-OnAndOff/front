import { useEffect, useRef, useState } from 'react'
import {
  ChatBadge,
  ChatRoomDate,
  ChatRoomInput,
  ChatRoomMessage,
  ChatRoomTitle,
} from '@/components/chat'
import { CHAT, ChatMessage, ChatResponse, ChatRoom, ChatUser } from '@/types'
import useChatStore from '@/hooks/useChatStore'
import socket from '@/utils/socket'
import { useIntersectionObserver } from '@/hooks'
import { fetchGetChatPrevMessages, fetchGetChatRoom } from '@/api/chat'
import { convertArrayToMap, formatDate } from '@/utils'
import { useParams } from 'react-router-dom'

export default function Chat() {
  const path = useParams()
  const messageEndRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<ChatMessage[]>([])
  const [room, setRoom] = useState<ChatRoom | null>(null)
  const [users, setUsers] = useState<Map<string, ChatUser>>(new Map())

  const { user } = useChatStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isNext, setIsNext] = useState(false)
  const [isScrollToBottom, setIsScrollToBottom] = useState(false)
  const page = useRef(1)

  useEffect(() => {
    page.current = 1
    const fetchRoom = async () => {
      if (path.roomId) {
        const response = await fetchGetChatRoom(path.roomId)
        if (response) {
          setRoom(response)
          setUsers(convertArrayToMap(response.users))
          socket.emit(
            CHAT.ROOM_JOIN,
            { roomId: response?._id },
            (response: ChatResponse) => {
              console.log('ROOM_JOIN', response)
              setIsNext(true)
              setIsScrollToBottom(true)
            },
          )
        }
      }
    }

    fetchRoom()
  }, [path])

  useEffect(() => {
    socket.on(
      CHAT.PREV_MESSAGES,
      ({ messages }: { messages: ChatMessage[] }) => {
        setItems(messages)
      },
    )

    socket.on(CHAT.MESSAGE, ({ message }: { message: ChatMessage }) => {
      setItems((prev) => [message, ...prev])
    })

    socket.on(CHAT.USER_JOIN, ({ message }: { message: ChatMessage }) => {
      setItems((prev) => [message, ...prev])
    })

    socket.on(CHAT.USER_INFO, (response: ChatUser) => {
      if (response) {
        setUsers((prevUsers) => {
          const { _id, ...rest } = response
          const newUsers = new Map(prevUsers)
          const existingData = newUsers.get(_id)!
          if (newUsers.has(_id) && existingData) {
            Object.assign(existingData, rest)
          } else {
            newUsers.set(_id, response)
          }

          return newUsers
        })
      }
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
    if (messageEndRef.current && isScrollToBottom) {
      messageEndRef.current.scrollIntoView()
    }
  }, [items, isScrollToBottom])

  return (
    <>
      {room && user && (
        <div className='flex-col lg:overflow-y-auto lg:h-full h-full lg:flex lg:col-span-2 relative w-full'>
          <ChatRoomTitle room={room} users={users} />
          <div className='flex flex-1 overflow-auto gap-2 lg:p-4 lg:mt-20 flex-col-reverse h-[calc(100vh-190px)] lg:h-full relative'>
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
                    users={users}
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
