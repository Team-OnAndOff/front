import { ChatUser } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChatProps {
  user: ChatUser | null
  setUser: (user: ChatUser) => void
}

const useChatStore = create(
  persist<ChatProps>(
    (set) => ({
      user: null,
      setUser: (user: ChatUser) => set({ user }),
    }),
    {
      name: 'chat',
    },
  ),
)

export default useChatStore
