import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { SearchInput } from '@/components/common'
import { CategoryHeader, TabList, InfinitePosts } from '@/components'
import { Category, CardData } from '@/types'
import { fetchGetCategory } from '@/api/category'
import { fetchGetEvents } from '@/api/event'
import { NoResult } from '@/assets/images'

const handleSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string | undefined,
) => {
  if (value) {
    searchParams.set(key, value)
  } else {
    searchParams.delete(key)
  }
}

export default function MeetupList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)
  const [searchInput, setSearchInput] = useState<string>('')
  // const [noResults, setNoResults] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const categoryId = Number(location.pathname.split('/')[2].trim())

  // const listInnerRef = useRef()
  // const [currPage, setCurrPage] = useState(1)
  // const [prevPage, setPrevPage] = useState(0)
  // const [lastList, setLastList] = useState(false)

  // 상세 카테고리에 따라 리스트를 받을 곳
  const [postData, setPostData] = useState<CardData[]>([])

  // 부모 카테고리 클릭 시, 다시 All로
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const hasSubCategory = Number(searchParams.get('subcategories'))
    if (
      categoryId !== Number(searchParams.get('categoryId')) &&
      !hasSubCategory
    ) {
      console.log('부모 카테고리 클릭 시, 다시 All로')
      fetchCategoryData()
      handleTabClick(0)
    }
    handleTabClick(hasSubCategory)
    fetchCategoryData()
  }, [categoryId, selectedCategoryId])

  // 상세 카테고리
  // useEffect(() => {
  // fetchCategoryData()
  // 동일한 부모 카테고리에서 상세 카테고리 탭 클릭 시
  // if (
  //   categoryId === Number(searchParams.get('categoryId')) &&
  //   selectedCategoryId !== Number(searchParams.get('selectedCategoryId'))
  // ) {
  //   console.log('동일한 부모 카테고리에서 상세 카테고리 탭 클릭 시')
  // fetchEventData(selectedCategoryId)
  // }
  // }, [categoryId])

  // 모임 목록리스트
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const hasSubCategory = Number(searchParams.get('subcategories'))

    console.log('모임 목록리스트')
    inputSearch(searchInput)
    fetchEventData(categoryId, hasSubCategory)
  }, [selectedCategoryId, searchInput])

  // 카테고리 목록 불러오기
  const fetchCategoryData = async () => {
    try {
      const categoryData = await fetchGetCategory(categoryId)
      setCategories(categoryData?.subCategories || [])
      console.log('카테고리 클릭')
    } catch (error) {
      console.error('Error fetchCategoryData', error)
    }
  }

  // 상세 카테고리 탭
  const handleTabClick = async (subCategoryId: number) => {
    const searchParams = new URLSearchParams(location.search)
    console.log('탭 클릭')
    if (!subCategoryId) {
      searchParams.delete('subcategories')
    } else {
      searchParams.set('subcategories', subCategoryId.toString())
    }
    setSelectedCategoryId(subCategoryId)
    navigate(`?${searchParams}`)
  }

  // 검색기능
  const inputSearch = async (searchInput: string) => {
    const searchParams = new URLSearchParams(location.search)
    handleSearchParams(searchParams, 'search', searchInput || undefined)
    console.log('검색 함수')
    navigate(`?${searchParams}`)
  }

  // 모임 데이터 가져오기
  const fetchEventData = async (categoryId: number, subCategoryId: number) => {
    try {
      console.log('모임 데이터 가져오기')
      const eventData = await fetchGetEvents({ categoryId, subCategoryId })
      setPostData(eventData || [])
    } catch (error) {
      console.error('Error fetchEventData', error)
    }
  }

  // 엔터로 검색
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchInput(e.currentTarget.value)
    }
  }

  // 검색창 보이게
  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
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
        {/* TabList 컴포넌트*/}
        <TabList
          categories={[{ id: 0, name: 'All' }, ...categories]}
          handleTabClick={handleTabClick}
          selectedCategoryId={selectedCategoryId}
        />

        <div className='flex items-center justify-center mt-6'>
          {/* 검색기능 */}
          <div className='w-96'>
            <SearchInput
              searchInputHandler={searchInputHandler}
              handleKeyPress={handleKeyPress}
              searchInput={searchInput}
            />
          </div>
        </div>
        {postData.length === 0 ? (
          <div className='flex flex-col items-center justify-center my-10 gap-y-6'>
            <img src={NoResult} alt='NoResult' />
            <p className='text-body-size text-black-color'>
              검색결과가 없습니다.
            </p>
          </div>
        ) : (
          <InfinitePosts
            data={postData}
            // onScroll={onScroll}
            // listInnerRef={listInnerRef}
            categoryId={categoryId}
          />
        )}
      </div>
    </>
  )
}
