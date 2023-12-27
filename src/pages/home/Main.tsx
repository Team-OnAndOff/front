import { useState, useEffect } from 'react'
import { ImageSlide, MainPosts } from '@/components'
import { fetchGetEvents } from '@/api/event'
import { CardData, EventQuery } from '@/types'

export default function Main() {
  const [topData, setTopData] = useState<CardData[]>([])
  const [crewData, setCrewData] = useState<CardData[]>([])
  const [challengeData, setChallengeData] = useState<CardData[]>([])

  useEffect(() => {
    const fetchData = async (query: EventQuery) => {
      try {
        const data = await fetchGetEvents(query)
        if (query.sort === 'likes') {
          setTopData(data)
        } else if (query.categoryId === 1) {
          setCrewData(data)
        } else if (query.categoryId === 2) {
          setChallengeData(data)
        }
      } catch (error) {
        console.error('Error', error)
      }
    }
    fetchData({ sort: 'likes', limit: 3 })
    fetchData({ categoryId: 1, page: 1, perPage: 9 })
    fetchData({ categoryId: 2, page: 1, perPage: 9 })
  }, [])

  return (
    <>
      <main className='flex flex-col py-16 gap-y-16'>
        <ImageSlide />
        <article className='flex flex-col gap-y-16'>
          <MainPosts
            title='🔥 HOT! 금주의 가장 인기있는 모임!'
            data={topData}
            isSlide={false}
          />
          <MainPosts
            title='👯 나와 맞는 Crew를 찾아보세요!'
            data={crewData}
            isSlide={true}
          />
          <MainPosts
            title='💯 Challenge로 하루하루 도장깨기!'
            data={challengeData}
            isSlide={true}
          />
        </article>
      </main>
    </>
  )
}
