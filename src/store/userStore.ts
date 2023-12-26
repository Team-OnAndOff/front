import { User } from '@/types'
import { create } from 'zustand'

interface UserProps {
  user: User | null
  setLoginUser: (user: User) => void
}

const useAuthStore = create<UserProps>((set) => ({
  user: null,
  setLoginUser: (user: User) => {
    set({ user })
    localStorage.setItem('user', JSON.stringify(user))
  },
  // 여기다가 로그아웃이나 회원 탈퇴하는 부분 추가
}))

export default useAuthStore
