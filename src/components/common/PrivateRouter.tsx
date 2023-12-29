import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthStore from '@/store/userStore'
import Swal, { SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function PrivateRouter() {
  const navigate = useNavigate()
  const { user } = useAuthStore((state) => state)
  useEffect(() => {
    if (!user) {
      MySwal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 후에 채팅방에 입장하실 수 있습니다.',
        icon: 'warning',
        iconColor: '#ff5e2e',
        footer: '로그인 페이지로 이동하시겠습니까?',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
      }).then((result: SweetAlertResult) => {
        if (result.isDismissed) {
          MySwal.close()
          navigate(-1)
        } else if (result.isConfirmed) {
          navigate(-1)
        } else {
          if (
            window.location.pathname === '/chat' ||
            window.location.pathname === '/userinfo'
          ) {
            navigate('/')
          }
        }
      })
      return
    }
  }, [navigate, user])
  return user ? <Outlet /> : null
}
