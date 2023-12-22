import { useState } from 'react'
import { EventComplaint, UserComplaint } from '@/components/admin/complaint'
import { TabList } from '@/components'

enum COMPLAINT {
  USER = 1,
  EVENT = 2,
}

export default function AdminComplaint() {
  const [selected, setSelected] = useState(COMPLAINT.USER)
  const items = [
    { id: COMPLAINT.USER, name: '유저' },
    {
      id: COMPLAINT.EVENT,
      name: '모임',
    },
  ]

  return (
    <>
      <div className='flex flex-col gap-4 w-full px-3 mx-auto box-border h-full max-h-screen'>
        <TabList
          categories={items}
          handleTabClick={(id: COMPLAINT) => setSelected(id)}
          selectedCategoryId={selected}
        />
        <div className='flex flex-col break-words border border-dashed rounded-2xl border-stone-200 py-8 pt-6 px-9 text-[0.95rem] text-center overflow-x-scroll'>
          {selected === COMPLAINT.USER && <UserComplaint />}
          {selected === COMPLAINT.EVENT && <EventComplaint />}
        </div>
      </div>
    </>
  )
}
