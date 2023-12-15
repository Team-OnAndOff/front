import { useState } from 'react'

interface CheckboxProps {
  options: { label: string; value: number }[]
  onChange: (selectedValues: number[]) => void
  textSize: 'size-body' | 'size-title' | 'size-subbody'
}

export default function CheckBox({
  options,
  onChange,
  textSize,
}: CheckboxProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>([])

  const handleCheckboxChange = (value: number) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    setSelectedValues(updatedValues)
    onChange(updatedValues)
  }
  return (
    <div className='flex'>
      {options.map((option) => (
        <div className='flex items-center mr-5' key={option.value}>
          <input
            type='checkbox'
            id={`${option.value}`}
            value={option.value || 0}
            checked={selectedValues.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            className={`w-4 h-4 cursor-pointer accent-main-color mr-1`}
          />
          <label
            className={`font-medium text-${textSize} cursor-pointer`}
            htmlFor={`${option.value}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}
