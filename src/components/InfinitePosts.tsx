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
      <div className='grid desktop:grid-cols-3 desktop:gap-4 gap-y-20 smooth-color'>
        {items?.map((item) => <Card key={item.id} data={item} />)}
      </div>
    </section>
  )
}
