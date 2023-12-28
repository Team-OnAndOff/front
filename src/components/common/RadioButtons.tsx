import { ChangeEvent } from 'react'
interface RadioButtonsProps {
  data: { text: string; value: number }[]
  name: string
  clickChange?: (value: number) => void
  selectedValue?: number | null
  // defaultSelectedValue?: number | null
  disabled?: boolean
}

export default function RadioButtons({
  data,
  clickChange,
  selectedValue,
  // defaultSelectedValue,
}: RadioButtonsProps) {
  return (
    <div className='flex items-center'>
      <div className='flex gap-12'>
        {data.map((item) => (
          <label key={item.text} className='flex items-center cursor-pointer'>
            <input
              className='w-4 h-4 mb-1 ml-2 text-orange-600 bg-orange-500 border-orange-300 cursor-pointer accent-main-color focus:ring-0 focus:border-orange-500 dark:focus:border-orange-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
              type='radio'
              value={item.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value)
                clickChange?.(value)
              }}
              checked={selectedValue === item.value}
            />
            <span className='text-size-body mb-0.5 ml-2 cursor-pointer'>
              {item.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
