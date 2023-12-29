import { useState, useEffect } from 'react'
import { ImageSlide, MainPosts, StartPopup } from '@/components'
import { fetchGetEvents } from '@/api/event'
import { CardData, EventQuery } from '@/types'
import { useCookies } from 'react-cookie'

export default function Main() {
  const [topData, setTopData] = useState<CardData[]>([])
  const [crewData, setCrewData] = useState<CardData[]>([])
  const [challengeData, setChallengeData] = useState<CardData[]>([])
  const [modal, setModal] = useState(false)

  const [hasCookie, setHasCookie] = useState(true)
  const [appCookies, setAppCookies] = useCookies()
  //
  // 방문이력 조회
  const getExpiredDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date
  }

  const handleClickTodayClose = () => {
    if (!appCookies) return

    // 하루동안 안보이게
    const expires = getExpiredDate(1)
    setAppCookies('MODAL_EXPIRES', true, { path: '/', expires })

    setModal(false)
  }

  useEffect(() => {
    if (appCookies['MODAL_EXPIRES']) return
    console.log(appCookies['MODAL_EXPIRES'])
    setHasCookie(false)
  }, [])

  // 카테고리 정보 받아오기
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
    // 페이지 진입 시, 팝업창 보여주기
    setModal(true)
  }, [])

  // 스크롤 막기
  // if (modal) {
  //   document.body.classList.add('overflow-y-hidden')
  // } else {
  //   document.body.classList.remove('overflow-y-hidden')
  // }

  return (
    <>
      <main className='flex flex-col py-16 gap-y-16'>
        <ImageSlide />
        <article className='flex flex-col gap-y-16'>
          <MainPosts
            title='🔥 HOT! 가장 인기있는 모임 TOP3!'
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

        {!hasCookie && modal && (
          <StartPopup
            handleClickTodayClose={handleClickTodayClose}
            setModal={setModal}
          />
        )}
      </main>
    </>
  )
}
