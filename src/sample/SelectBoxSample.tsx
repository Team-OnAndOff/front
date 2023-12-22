import SelectBox from '@/components/common/SelectBox'
import { useState } from 'react'

export default function SelectBoxSample() {
  const [selectedValue, setSelectedValue] = useState<number>(0)

  const handleSelectBoxChange = (selectedValue: number) => {
    setSelectedValue(selectedValue)
  }
  console.log('selectBox Value :', selectedValue)

  // 크루/챌린지 라디오 버튼 선택에 값에 따라 options 값을 다르게 내려줘야함.
  const options = [
    { value: 1, label: '외국어' },
    { value: 2, label: '개발' },
    { value: 3, label: '운동' },
    { value: 4, label: '재테크' },
    { value: 5, label: '독서' },
  ]

  return (
    <SelectBox
      bgColor='light-gray-color'
      textSize='size-body'
      options={options}
      onChange={handleSelectBoxChange}
    />
  )
}
