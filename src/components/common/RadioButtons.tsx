import { ChangeEvent } from 'react'

interface RadioButtonsProps {
  data: { text: string; value: number }[]
  name: string
  clickChange?: (value: number) => void
  selectedValue?: number | null
  disabled?: boolean
}

export default function RadioButtons({
  data,
  clickChange,
  selectedValue,
}: RadioButtonsProps) {
  return (
    <div className='flex items-center'>
      <div className='flex gap-12'>
        {data.map((item) => (
          <label key={item.text} className='flex items-center'>
            <input
              className='w-4 h-4 mb-1 ml-2 cursor-pointer accent-main-color dark:accent-dark-light-color focus:ring-0 transition-smooth'
              type='radio'
              value={item.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value)
                clickChange?.(value)
              }}
              checked={selectedValue === item.value}
            />
            <span className='dark:text-dark-light-color cursor-pointer transition-smooth text-black-color text-size-body mb-0.5 ml-2'>
              {item.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
