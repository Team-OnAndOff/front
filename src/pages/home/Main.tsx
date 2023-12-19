import { useState, useEffect } from 'react'
import { ImageSlide, MainPosts } from '@/components'
import { CardData } from '@/types'
import { fetchGetEvents } from '@/api/event'

export default function Main() {
  const [postData, setPostData] = useState<CardData[]>([])
  const [crewData, setCrewData] = useState<CardData[]>([])
  const [challengeData, setChallengeData] = useState<CardData[]>([])

  useEffect(() => {
    const fetchData = async (categoryId: number) => {
      try {
        const data = await fetchGetEvents(categoryId)
        setPostData(data)

        if (categoryId === 1) {
          setCrewData(data)
        } else if (categoryId === 2) {
          setChallengeData(data)
        }
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchData(1)
    fetchData(2)
  }, [])

  return (
    <main className='flex flex-col py-16 gap-y-16'>
      <ImageSlide />
      <article className='flex flex-col gap-y-16'>
        <MainPosts
          title='🔥 HOT! 금주의 가장 인기있는 모임!'
          data={postData}
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
  )
}
