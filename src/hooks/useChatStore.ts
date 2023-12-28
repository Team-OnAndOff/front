import { ChatRoom, ChatUser } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChatProps {
  room: ChatRoom | null
  user: ChatUser | null
  setUser: (user: ChatUser) => void
  setRoom: (room: ChatRoom) => void
}

const useChatStore = create(
  persist<ChatProps>(
    (set) => ({
      user: null,
      room: null,
      setUser: (user: ChatUser) => set({ user }),
      setRoom: (room: ChatRoom) => set({ room }),
    }),
    {
      name: 'user',
    },
  ),
)

export default useChatStore
