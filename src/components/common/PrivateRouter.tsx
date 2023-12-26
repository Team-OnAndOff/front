// import useAuthStore from '@/store/userStore'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function PrivateRouter() {
  //const location = useLocation()
  const navigate = useNavigate()
  //const { user } = useAuthStore((state) => state)
  //console.log(user)
  const user = localStorage.getItem('user')
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])
  return user ? <Outlet /> : null
}
