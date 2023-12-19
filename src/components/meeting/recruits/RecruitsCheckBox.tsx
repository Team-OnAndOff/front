import {
  FieldValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form'
interface CheckBoxProps {
  options: { text: string; value: number }[]
  name: string
  setValue: UseFormSetValue<FieldValues>
  register: UseFormRegisterReturn
}

export default function RecruitsCheckBox({
  options,
  register,
  setValue,
  name,
}: CheckBoxProps) {
  const handleCheckboxChange = (option: { text: string; value: number }) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked
      setValue(name, (prevTargets: number[]) =>
        isChecked
          ? [...prevTargets, option.value]
          : prevTargets.filter((target) => target !== option.value),
      )
    }
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
              {...register}
              onChange={handleCheckboxChange(option)}
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
