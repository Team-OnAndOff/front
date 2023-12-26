import { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProps {
  user: User | null
  setLoginUser: (user: User) => void
}

const useAuthStore = create(
  persist<UserProps>(
    (set) => ({
      user: null,
      setLoginUser: (user: User) => set({ user }),
    }),
    {
      name: 'user',
    },
  ),
)

export default useAuthStore
