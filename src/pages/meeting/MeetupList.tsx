import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { SearchInput } from '@/components/common'
import { CategoryHeader, TabList, InfinitePosts } from '@/components'
import { Category, CardData } from '@/types'
import { fetchGetCategory } from '@/api/category'
import { fetchGetEvents } from '@/api/event'
import { NoResult } from '@/assets/images'
import { useIntersectionObserver } from '@/hooks'
import { HandleSearchParams } from '@/utils'

export default function MeetupList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)
  const [searchInput, setSearchInput] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()
  const categoryId = Number(location.pathname.split('/')[2].trim())

  const page = useRef(1)
  const perPage = 12
  const [postData, setPostData] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNext, setIsNext] = useState(false)

  // 모임리스트 불러오기
  const fetchItems = async () => {
    setIsLoading(true)

    try {
      const newData = await fetchGetEvents({
        categoryId,
        subCategoryId: selectedCategoryId,
        search: searchInput,
        page: page.current + 1,
        perPage,
      })

      setPostData((prevData) => [...prevData, ...newData])
      if (newData.length === 0) {
        setIsNext(false)
      } else {
        setIsNext(true)
      }
    } catch (error) {
      console.error('Error fetching data', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onIntersect: IntersectionObserverCallback = async ([
    { isIntersecting },
  ]) => {
    if (isIntersecting && !isLoading && isNext) {
      await fetchItems()
      page.current += 1
    }
  }

  const { setTarget } = useIntersectionObserver({ onIntersect })

  // 카테고리
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const hasSubCategory = Number(searchParams.get('subCategoryId'))

    if (
      categoryId !== Number(searchParams.get('categoryId')) &&
      !hasSubCategory
    ) {
      handleTabClick(0)
    }
    handleTabClick(hasSubCategory)
    fetchCategoryData()
  }, [categoryId])

  // 검색어 입력
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value
      setSearchInput(value)

      const searchParams = new URLSearchParams(location.search)
      HandleSearchParams(searchParams, 'search', value)
      navigate(`?${searchParams}`)
    }
  }

  // 모임리스트(검색 기능)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const hasSubCategory = Number(searchParams.get('subCategoryId'))
    const hasSearch = searchParams.get('search')

    // 검색어 입력
    const inputSearch = async (searchInput: string) => {
      const searchParams = new URLSearchParams(location.search)
      HandleSearchParams(searchParams, 'search', searchInput)
      navigate(`?${searchParams}`)
    }

    // 태그검색
    if (hasSearch) {
      inputSearch(hasSearch)
      setSearchInput(hasSearch)
      fetchEventData(categoryId, hasSubCategory, hasSearch)
    } else {
      // 일반 리스트 가져오기
      if (!searchInput) {
        fetchEventData(
          categoryId,
          hasSubCategory,
          searchInput,
          page.current,
          perPage,
        )
      } else {
        // 검색어 입력
        inputSearch(searchInput)
        fetchEventData(categoryId, hasSubCategory, searchInput)
      }
    }
  }, [categoryId, selectedCategoryId, searchInput, location.search])

  // 카테고리 API
  const fetchCategoryData = async () => {
    try {
      const categoryData = await fetchGetCategory(categoryId)
      setCategories(categoryData?.subCategories || [])
    } catch (error) {
      console.error('Error fetchCategoryData', error)
    }
  }

  // 상세 카테고리 탭 클릭
  const handleTabClick = async (subCategoryId: number) => {
    page.current = 1
    const searchParams = new URLSearchParams(location.search)

    if (!subCategoryId) {
      searchParams.delete('subCategoryId')
    } else {
      HandleSearchParams(
        searchParams,
        'subCategoryId',
        subCategoryId.toString(),
      )
    }
    setSelectedCategoryId(subCategoryId)
    navigate(`?${searchParams}`)
  }

  // 목록리스트 API
  const fetchEventData = async (
    categoryId?: number,
    subCategoryId?: number,
    search?: string,
    page?: number,
    perPage?: number,
  ) => {
    try {
      const eventData = await fetchGetEvents({
        categoryId,
        subCategoryId,
        search,
        page,
        perPage,
      })
      setPostData(eventData || [])
      if (eventData.length === 0) {
        setIsNext(false)
      } else {
        setIsNext(true)
      }
    } catch (error) {
      console.error('Error fetchEventData', error)
    }
  }

  // 초기화 버튼
  const handleResetClick = () => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('search')
    searchParams.delete('subCategoryId')

    handleTabClick(0)

    navigate(`?${searchParams}`)
    setSearchInput('')
  }

  return (
    <>
      <CategoryHeader
        title={categoryId === 1 ? 'Crew' : 'Challenge'}
        content={
          categoryId === 1
            ? '💡같은 관심사를 가진 사람들과의 모임은 어떨까요?💡'
            : '🎯함께 도전하고 성장해요!🎯'
        }
      />
      <div>
        <TabList
          categories={[{ id: 0, name: 'All' }, ...categories]}
          handleTabClick={handleTabClick}
          selectedCategoryId={selectedCategoryId}
        />

        <div className='flex items-center justify-center mt-6'>
          <div className='w-96'>
            <SearchInput
              handleKeyPress={handleKeyPress}
              searchInput={searchInput}
              hasReset={true}
              handleResetClick={handleResetClick}
            />
          </div>
        </div>
        {postData.length === 0 ? (
          <div className='flex justify-center my-10'>
            <img src={NoResult} alt='NoResult' />
          </div>
        ) : (
          <div>
            <InfinitePosts data={postData} categoryId={categoryId} />
            <div ref={setTarget} className='h-[60px]'>
              {isLoading && 'Loading...'}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
