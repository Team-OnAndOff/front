import { useState, useEffect } from 'react'

interface CheckBoxProps {
  options: { text: string; value: number }[]
  name: string
  onChange: (selectedValues: number[]) => void
  selectedValues?: number[]
}

export default function RecruitsCheckBox({
  options,
  onChange,
  selectedValues: initialSelectedValues = [],
}: CheckBoxProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>(
    initialSelectedValues,
  )

  useEffect(() => {
    if (
      !initialSelectedValues.every(
        (value, index) => value === selectedValues[index],
      )
    ) {
      setSelectedValues(initialSelectedValues)
    }
  }, [initialSelectedValues, selectedValues])

  const handleCheckBoxChange = (value: number) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    setSelectedValues(updatedValues)
    onChange(updatedValues)
  }

  return (
    <div className='flex items-center'>
      <div className='flex gap-x-5'>
        {options.map((option) => (
          <label key={option.text} className='flex items-center gap-x-1'>
            <input
              className='w-4 h-4 mr-1 cursor-pointer accent-main-color dark:accent-dark-light-color transition-smooth'
              type='checkbox'
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckBoxChange(option.value)}
            />
            <span className='cursor-pointer text-size-body text-black-color dark:text-dark-light-color transition-smooth'>
              {option.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
