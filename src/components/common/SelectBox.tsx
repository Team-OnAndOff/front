import { useState, useEffect, useRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { IoIosArrowDown } from 'react-icons/io'

interface SelectBoxProps {
  options: { label: string; value: number }[]
  bgColor: string
  placeholder?: string
  textSize: 'size-body' | 'size-title' | 'size-subbody'
  register: UseFormRegisterReturn
  onClick?: (value: number) => void
  value?: number | null
}

export default function SelectBox({
  options,
  bgColor,
  textSize,
  register,
  onClick,
  value,
  placeholder = '카테고리를 선택하세요',
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<number | null>(
    value || null,
  )
  const selectBoxRef = useRef<HTMLDivElement>(null)

  const selectStyle = (bgColor: string, textSize: string) => {
    return `bg-${bgColor} flex justify-between border-2 cursor-pointer focus:bg-main-light-color text-black-color text-${textSize} rounded-button-radius focus:border-main-color block tablet:w-80 desktop:w-80 p-2.5 px-4 items-center transition-smooth dark:bg-dark-light-color`
  }

  const handleSelect = (value: number) => {
    setSelectedValue(value)
    setIsOpen(false)

    if (onClick) {
      onClick(value)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectBoxRef.current &&
      !selectBoxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // value prop이 변경될 때마다 selectedValue를 업데이트
    setSelectedValue(value || null)
  }, [value])

  return (
    <div className='relative inline-block' ref={selectBoxRef}>
      <div
        className={`${selectStyle(bgColor, textSize)} ${
          isOpen ? 'border-main-color dark:border-dark-light-color' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue !== null
          ? options.find((option) => option.value === selectedValue)?.label
          : placeholder}
        <IoIosArrowDown />
      </div>
      {isOpen && (
        <ul className='absolute left-0 w-full p-0 m-0 mt-1 overflow-hidden list-none bg-white border-2 border-main-color dark:border-dark-light-color rounded-button-radius dark:bg-dark-light-color'>
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2.5 px-4 hover:bg-main-light-color hover:dark:bg-dark-main-color/[0.2] cursor-pointer border-main-color border-b dark:border-dark-main-color last:border-0 ${
                selectedValue === option.value
                  ? 'font-bold bg-main-light-color dark:bg-dark-main-color/[0.2]'
                  : ''
              }`}
              onClick={() => handleSelect(option.value)}
              {...register}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
