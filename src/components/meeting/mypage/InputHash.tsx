import { UseFormRegisterReturn } from 'react-hook-form'

interface InputsProps {
  placeholder?: string
  width?: string
  onEnter?: (value: string) => void
  register: UseFormRegisterReturn
}

const InputHash = ({ placeholder, width = 'w-80', register }: InputsProps) => {
  return (
    <div
      className={`pt-4 pb-1 flex flex-col pl-3 border-b-2 ${width} border-light-gray-color focus-within:border-main-color`}
    >
      <input
        className='w-full text-size-body text-black-color focus:outline-none'
        type='text'
        placeholder={placeholder}
        {...register}
      />
    </div>
  )
}

export default InputHash
