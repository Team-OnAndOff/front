import { ImageSlide, HotPostsSection } from '@/components'
import { data } from '@/data/post'

export default function Main() {
  const allData = data

  const crewData = data.filter((item) => item.category === 'Crew')

  const challengeData = data.filter((item) => item.category === 'Challenge')

  return (
    <main className='flex flex-col py-16 gap-y-16'>
      <ImageSlide />
      <article className='flex flex-col gap-y-16'>
        <HotPostsSection
          title='🔥 HOT! 금주의 가장 인기있는 모임!'
          data={allData}
          isSlide={false}
        />
        <HotPostsSection
          title='👯 나와 맞는 Crew를 찾아보세요!'
          data={crewData}
          isSlide={true}
          categoryType='Crew'
        />

        <HotPostsSection
          title='💯 Challenge로 하루하루 도장깨기!'
          data={challengeData}
          isSlide={true}
          categoryType='Challenge'
        />
      </article>
    </main>
  )
}
