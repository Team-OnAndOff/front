import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DayPicker } from 'react-day-picker'

interface RecruitsDayPickProps {
  onDayClick: (date: Date) => void
}

export default function RecruitsDayPick({ onDayClick }: RecruitsDayPickProps) {
  const { watch, setValue } = useForm()
  const selectedDate = watch('selectedDate')
  const isDisabled = (day: Date) => day < new Date()

  useEffect(() => {
    const today = new Date()
    if (!selectedDate) {
      setValue('selectedDate', today)
    }
  }, [selectedDate, setValue])

  return (
    <>
      <DayPicker
        className='absolute z-10 flex flex-col p-5 mt-1 border-2 bg-main-light-color rounded-small-radius'
        mode='single'
        required
        selected={selectedDate}
        onDayClick={(day: Date) => {
          if (!isDisabled(day)) {
            setValue('selectedDate', day)
            onDayClick(day)
          }
        }}
        disabled={isDisabled}
      />
    </>
  )
}
