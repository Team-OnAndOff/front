import { FaCirclePlus } from 'react-icons/fa6'
import Swal, { SweetAlertResult } from 'sweetalert2'
import useAuthStore from '@/store/userStore'
import { useNavigate } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function FloatingButton() {
  const navigate = useNavigate()
  const store = useAuthStore()

  const handleClick = () => {
    if (store.user) {
      navigate('/recruits-create')
    } else {
      MySwal.fire({
        title: '모임 등록',
        html: '모임 등록 페이지로 이동하시겠습니까?',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
        footer: '비회원인 유저는 로그인 페이지로 이동합니다.',
        icon: 'question',
        iconColor: '#ff5e2e',
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }

  // 로그인 페이지나 등록페이지에서는 안보이도록
  if (
    window.location.pathname === '/login' ||
    window.location.pathname === '/recruits-create'
  )
    return null

  return (
    <>
      <button
        onClick={handleClick}
        className='group bottom-[40px] right-[40px] w-[30px] h-[30px] bg-white fixed rounded-full drop-shadow-xl hover:drop-shadow-2xl'
      >
        <div className='animate-wiggle'>
          <FaCirclePlus fill='#3a823f' size={30} />
        </div>
        <div className='absolute bottom-0 px-2 py-1 transition-opacity rounded shadow opacity-0 pointer-events-none bg-black-color text-size-subbody right-10 w-max text-light-gray-color group-hover:opacity-100'>
          모집글 등록하기
        </div>
      </button>
    </>
  )
}
