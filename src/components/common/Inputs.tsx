import { useState } from 'react'

interface InputsProps {
  placeholder?: string
  width?: string
  useMust?: boolean
  onEnter?: (value: string) => void
}

export default function Inputs({
  placeholder,
  width = 'w-80',
  useMust = false,
  onEnter,
}: InputsProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(value)
      setValue('')
    }
  }
  return (
    <>
      <div
        className={`p-1 pl-3 border-b-2 ${width} border-light-gray-color focus-within:border-main-color`}
      >
        <input
          className='w-full text-size-body text-black-color focus:outline-none'
          type='text'
          placeholder={placeholder}
          value={value}
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
