import { useNavigate } from 'react-router-dom'
import { FaCirclePlus } from 'react-icons/fa6'

export default function FloatingButton() {
  const navigator = useNavigate()
  const handleClick = () => {
    // 로그인이 되어있을 경우, 등록페이지로 이동

    // 로그인 안되어 있을 경우, 모달 띄운 후, 로그인페이지로 이동
    navigator('/recruits-create')
  }

  return (
    <button
      onClick={handleClick}
      className='group  bottom-[40px] right-[40px] w-[30px] h-[30px] bg-white fixed rounded-full drop-shadow-xl  hover:drop-shadow-2xl '
    >
      <div className='animate-wiggle'>
        <FaCirclePlus fill='#3a823f' size={30} />
      </div>
      <div className='absolute bottom-0 px-2 py-1 transition-opacity rounded shadow opacity-0 pointer-events-none bg-black-color text-size-subbody right-10 w-max text-light-gray-color group-hover:opacity-100'>
        모집글 등록하기
      </div>
    </button>
  )
}
