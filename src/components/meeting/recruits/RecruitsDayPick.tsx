import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface RecruitsDayPickProps {
  onDayClick: (date: Date) => void
}

export default function RecruitsDayPick({ onDayClick }: RecruitsDayPickProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const today = new Date()

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
      color: '#ff5e2e',
    },
    selected: {
      color: 'white',
      backgroundColor: '#ff5e2e',
    },
  }

  return (
    <DayPicker
      className='absolute z-10 flex flex-col p-5 m-0 mt-1 border-2 bg-main-light-color rounded-small-radius'
      mode='single'
      required
      showOutsideDays
      selected={selectedDate}
      onDayClick={handleDayClick}
      disabled={{ before: today }}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
    />
  )
}
