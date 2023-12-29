import { ChangeEvent } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TextAreaProps {
  placeholder?: string
  width?: string
  height?: string
  register: UseFormRegisterReturn
}

export default function TextArea({
  placeholder,
  width = 'w-input-small',
  height = 'h-60',
  register,
}: TextAreaProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    register.onChange(e)
  }

  return (
    <>
      <div
        className={`p-4 pl-3 border-2 ${width} ${height} rounded-xl dark:border-dark-light-color border-light-gray-color focus-within:border-main-color dark:focus-within:border-white transition-smooth`}
      >
        <textarea
          className='w-full h-full resize-none text-size-body text-black-color dark:text-dark-light-color focus:outline-none dark:bg-dark-main-color transition-smooth'
          placeholder={placeholder}
          {...register}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
