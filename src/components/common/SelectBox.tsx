interface SelectboxProps {
  options: { label: string; value: number }[]
  onChange: (selectedValue: number) => void
  bgColor: string
  placeholder?: string
  textSize: 'size-body' | 'size-title' | 'size-subbody'
}

export default function SelectBox({
  options,
  onChange,
  bgColor,
  textSize,
  placeholder = '카테고리를 선택하세요',
}: SelectboxProps) {
  const handleSelectBoxChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onChange(Number(event.target.value))
  }

  const selectStyle = (bgColor: string, textSize: string) => {
    return `bg-${bgColor} border-2 cursor-pointer border-dark-gray-color focus:bg-main-light-color text-black-color text-${textSize} rounded-lg focus:border-main-color focus:outline-none block w-60 p-3.5`
  }
  return (
    <>
      <select
        onChange={handleSelectBoxChange}
        defaultValue={placeholder}
        className={selectStyle(bgColor, textSize)}
      >
        {placeholder && (
          <option disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
