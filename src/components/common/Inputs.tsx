Inputs

import { KeyboardEvent } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputsProps {
  placeholder?: string
  width?: string
  onEnter?: (value: string) => void
  register?: UseFormRegisterReturn
  type?: string
  minValue?: number
}

export default function Inputs({
  placeholder,
  width = 'w-80',
  onEnter,
  register,
  type = 'text',
  minValue = 0,
}: InputsProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(e.currentTarget.value)
    }
  }

  return (
    <>
      <div
        className={`pt-4 pb-1 flex flex-col pl-3 border-b-2 ${width} dark:border-dark-light-color  border-light-gray-color focus-within:border-main-color focus-within:dark:border-white transition-smooth`}
      >
        <input
          className='w-full bg-white text-size-body dark:bg-dark-main-color/[0.5] text-black-color dark:text-dark-light-color focus:outline-none  transition-smooth'
          type={type}
          placeholder={placeholder}
          {...register}
          onKeyDown={handleKeyPress}
          min={minValue}
        />
      </div>
    </>
  )
}
