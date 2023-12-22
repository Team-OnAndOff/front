import { Card } from '@/components/common'
import { data } from '@/data/post'
import { useState } from 'react'

export default function CardSample() {
  const [items] = useState(data)
  return (
    <div className='grid grid-cols-3 gap-4'>
      {items.map((item, index) => (
        <Card
          key={index}
          postImageUrl={item.postImageUrl}
          title={item.title}
          startDate={item.startDate}
          endDate={item.endDate}
          category={item.category}
          leaderName={item.leaderName}
          leaderImageUrl={item.leaderImageUrl}
          createDate={item.createDate}
          detailCategory={item.detailCategory}
          // path={item.url}
        />
      ))}
    </div>
  )
}
