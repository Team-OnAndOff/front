// import useAuthStore from '@/store/userStore'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthStore from '@/store/userStore'

export default function PrivateRouter() {
  const navigate = useNavigate()
  const { user } = useAuthStore((state) => state)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])
  return user ? <Outlet /> : null
}
