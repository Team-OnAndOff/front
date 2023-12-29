import { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface RecruitsDayPickProps {
  onDayClick: (date: Date) => void
  selectedStartDate?: Date | undefined
  selectedEndDate?: Date | null
}

export default function RecruitsDayPick({
  onDayClick,
  selectedStartDate,
  selectedEndDate,
}: RecruitsDayPickProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const today = new Date()

  useEffect(() => {
    if (selectedEndDate) {
      setSelectedDate(selectedEndDate)
    } else if (selectedStartDate) {
      setSelectedDate(selectedStartDate)
    } else {
      setSelectedDate(selectedDate)
    }
  }, [selectedStartDate, selectedEndDate, selectedDate])

  const handleDayClick = (day: Date) => {
    setSelectedDate(day)
    onDayClick(day)
  }

  const modifiers = {
    today: (day: Date) => today.toDateString() === day.toDateString(),
    selected: (day: Date) =>
      selectedDate?.toDateString() === day.toDateString(),
  }

  const modifiersStyles = {
    today: {
      color: 'white',
      backgroundColor: '#ff5e2e',
    },
    selected: {
      color: 'white',
      backgroundColor: '#ff5e2e',
    },
  }

  const dayPickerStyles: React.CSSProperties = {
    '--rdp-background-color': '#FFDED4',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any

  let defaultMonthDate: Date

  if (selectedEndDate) {
    defaultMonthDate = selectedEndDate
  } else if (selectedStartDate) {
    defaultMonthDate = selectedStartDate
  } else {
    defaultMonthDate = today
  }

  return (
    <DayPicker
      className='absolute z-10 flex flex-col p-5 m-0 mt-1 border-2 bg-main-light-color dark:bg-dark-gray-color rounded-small-radius'
      mode='single'
      required
      showOutsideDays
      selected={selectedDate}
      defaultMonth={
        new Date(defaultMonthDate!.getFullYear(), defaultMonthDate!.getMonth())
      }
      onDayClick={handleDayClick}
      disabled={
        selectedStartDate ? { before: selectedStartDate } : { before: today }
      }
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      style={dayPickerStyles}
    />
  )
}
