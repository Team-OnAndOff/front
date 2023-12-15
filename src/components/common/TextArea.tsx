import { useState } from 'react'
interface TextAreaProps {
  placeholder?: string
  width?: string
  height?: string
}

export default function TextArea({
  placeholder,
  width = 'w-input-small',
  height = 'h-60',
}: TextAreaProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <>
      <div
        className={`p-4 pl-3 border-2 ${width} ${height} rounded-xl border-light-gray-color focus-within:border-main-color`}
      >
        <textarea
          className='w-full h-full resize-none text-size-body text-black-color focus:outline-none'
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
