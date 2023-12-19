import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DayPicker } from 'react-day-picker'

// interface RecruitsRangePickProps {
//   onDayClick: (range: { from: Date; to?: Date }) => void
// }

export default function RecruitsRangePick() {
  //   {
  //   onDayClick,
  // }: RecruitsRangePickProps
  const { watch, setValue } = useForm()

  const selectedRange = watch('selectedRange')

  const isDisabled = (day: Date) => day < new Date()

  useEffect(() => {
    const defaultSelected = {
      from: new Date(),
      to: undefined,
    }
    setValue('selectedRange', defaultSelected)
  }, [setValue])

  return (
    <>
      <DayPicker
        className='flex flex-col border-2'
        selected={selectedRange}
        showOutsideDays
        today={new Date()}
        fromMonth={new Date()}
        captionLayout='dropdown'
        mode='range'
        onDayClick={(day: Date) => {
          const existingRange = selectedRange || {
            from: new Date(),
            to: undefined,
          }
          if (existingRange.from && day < existingRange.from) {
            setValue('selectedRange', { from: day, to: undefined })
          } else {
            setValue('selectedRange', { ...existingRange, to: day })
          }
        }}
        disabled={isDisabled}
      />
    </>
  )
}
