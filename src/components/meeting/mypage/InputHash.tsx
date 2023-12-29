import { useState, KeyboardEvent } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputsProps {
  placeholder?: string
  width?: string
  onEnter?: (value: string) => void
  register: UseFormRegisterReturn
}

const InputHash = ({ placeholder, width = 'w-80', onEnter }: InputsProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (onEnter) {
        onEnter(inputValue.trim()) // 입력값에서 공백 제거 후 전달
        setInputValue('')
      }
    }
  }

  return (
    <div
      className={`pt-4 pb-1 flex flex-col pl-3 border-b-2 ${width} border-light-gray-color focus-within:border-main-color dark:focus-within:border-white`}
    >
      <input
        className='w-full text-size-body text-black-color dark:text-dark-light-color focus:outline-none dark:bg-dark-main-color'
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
    </div>
  )
}

export default InputHash
