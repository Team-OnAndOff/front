import CheckBoxList from '@/components/common/CheckBoxList'
import { useState } from 'react'

export default function CheckBoxSample() {
  const [selectedCheckValues, setSelectedCheckValues] = useState<number[]>([])
  const handleCheckboxChange = (selectedValues: number[]) => {
    setSelectedCheckValues(selectedValues)
  }

  console.log('CheckBox Value :', selectedCheckValues)
  const options = [
    { label: '대학생', value: 1 },
    { label: '직장인', value: 2 },
    { label: '취준생', value: 3 },
  ]
  return (
    <>
      <CheckBoxList
        textSize='size-body'
        options={options}
        onChange={handleCheckboxChange}
      />
    </>
  )
}
