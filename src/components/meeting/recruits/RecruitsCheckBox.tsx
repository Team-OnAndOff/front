import { useState } from 'react'

interface CheckBoxProps {
  options: { text: string; value: number }[]
  name: string
  onChange: (selectedValues: number[]) => void
}

export default function RecruitsCheckBox({ options, onChange }: CheckBoxProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>([])

  const handleCheckBoxChange = (value: number) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    setSelectedValues(updatedValues)
    onChange(updatedValues)
  }

  return (
    <div className='flex items-center'>
      <div className='flex'>
        {options.map((option) => (
          <label key={option.text} className='flex items-center mr-5'>
            <input
              className='w-4 h-4 mr-1 cursor-pointer accent-main-color'
              type='checkbox'
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckBoxChange(option.value)}
            />
            <span className='text-size-body mb-0.5 ml-2 cursor-pointer'>
              {option.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
