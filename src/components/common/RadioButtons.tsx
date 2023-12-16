import { UseFormRegister } from 'react-hook-form'

interface RadioButtonsProps {
  data: { text: string; value: string | number }[]
  name: string
  register: UseFormRegister<FormData>
}

export default function RadioButtons({
  data,
  name,
  register,
}: RadioButtonsProps) {
  return (
    <div className='flex items-center'>
      <div className='flex'>
        {data.map((item) => (
          <label key={item.text} className='flex items-center w-32'>
            <input
              className='w-4 h-4 mb-1 ml-2 text-orange-600 bg-orange-500 border-orange-300 accent-main-color focus:ring-0 focus:border-orange-500 dark:focus:border-orange-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
              type='radio'
              value={item.value}
              {...register(name, { required: true })}
            />
            <span className='text-size-body mb-0.5 ml-2'>{item.text}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
