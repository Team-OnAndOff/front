import { Card } from '@/components/common'
import { CardData } from '@/types'

export default function InfinitePosts({
  data,
}: {
  data?: CardData[]
  categoryId: number
}) {
  const items = data

  return (
    <section className='relative flex flex-col py-14 gap-y-7'>
      <div className='grid grid-cols-3 gap-4'>
        {items?.map((item) => <Card key={item.id} data={item} />)}
      </div>
    </section>
  )
}
