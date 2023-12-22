import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import logoImg from '@/assets/images/Logo.svg'
import { Button, Inputs } from '@/components/common'

interface FormData {
  inputField: string
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const { register } = useForm<FormData>()

  // TODO: 로그인 기능 구현
  const handleClick = () => {
    console.log('Login')

    navigate('/admin/users')
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-main-light-color'>
      <div className='flex flex-col w-full justify-between items-center gap-4 p-2 m-auto max-w-xl'>
        <div className='flex w-full justify-center items-center gap-4 mb-8'>
          <img src={logoImg} alt='logo' className='w-12 h-12' />
          <h1 className='font-semibold text-xl'>ON&OFF</h1>
        </div>
        <div className='w-full flex flex-col gap-4'>
          <div className=''>
            <label>asdf</label>
            <Inputs
              placeholder='이메일을 입력해주세요'
              width='w-full'
              register={register('inputField', { required: true })}
            />
          </div>
          <div>
            <label>asdf</label>
            <Inputs
              placeholder='비밀번호를 입력해주세요'
              width='w-full'
              register={register('inputField', { required: true })}
            />
          </div>
        </div>
        <Button onClick={handleClick} fill='activeFill' width='w-full'>
          로그인
        </Button>
      </div>
    </div>
  )
}
