import { Card } from '@/components/common'
import { CardData } from '@/types'

export default function InfinitePosts({
  data,
  // onScroll,
  // listInnerRef,
}: {
  data?: CardData[]
  categoryId: number
  // onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
  // listInnerRef: (e: HTMLDivElement) => void
}) {
  const items = data

  return (
    <section className='relative flex flex-col py-14 gap-y-7'>
      {/* <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: '100vh', overflowY: 'auto' }}
      > */}
      <div className='grid grid-cols-3 gap-4'>
        {items?.map((item) => <Card key={item.id} data={item} />)}
      </div>
      {/* </div> */}
    </section>
  )
}
