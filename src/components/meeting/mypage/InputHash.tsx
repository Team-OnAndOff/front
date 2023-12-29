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
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (onEnter) {
        onEnter(inputValue.trim()) // 입력값에서 공백 제거 후 전달
        setInputValue('')
      }
      setErrorMessage('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.trim().length <= 10) {
      setErrorMessage('')
      setInputValue(value)
    } else {
      setErrorMessage('*해시태그는 최대 10자 입력할 수 있습니다.')
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div
        className={`pt-4 pb-1 flex flex-col pl-3 border-b-2 ${width} border-light-gray-color focus-within:border-main-color dark:focus-within:border-white smooth-color`}
      >
        <input
          className='w-full text-size-body text-black-color dark:text-dark-light-color focus:outline-none dark:bg-dark-main-color smooth-color'
          type='text'
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      </div>
      {errorMessage && (
        <p className='pl-3 text-red-500 text-size-subbody'>{errorMessage}</p>
      )}
    </div>
  )
}

export default InputHash
