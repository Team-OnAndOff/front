import { ChangeEvent, KeyboardEvent } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputsProps {
  placeholder?: string
  width?: string
  useMust?: boolean
  onEnter?: (value: string) => void
  register: UseFormRegisterReturn
}

export default function Inputs({
  placeholder,
  width = 'w-80',
  useMust = false,
  onEnter,
  register,
}: InputsProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    register.onChange(e)
    onEnter && onEnter(e.target.value)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(e.currentTarget.value)
    }
  }

  return (
    <>
      <div
        className={`pt-4 pb-1 flex flex-col pl-3 border-b-2 ${width} border-light-gray-color focus-within:border-main-color`}
      >
        <input
          className='w-full text-size-body text-black-color focus:outline-none'
          type='text'
          placeholder={placeholder}
          {...register}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </div>
      {useMust && (
        <p className='p-1 text-size-subbody text-main-hover-color'>
          *필수로 입력해주세요.
        </p>
      )}
    </>
  )
}
