import { useState, useEffect } from 'react'
import { SearchInput } from '@/components/common'
import { CategoryHeader, TabList, MainPosts } from '@/components'
import { Category, CardData } from '@/types'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchGetCategory } from '@/api/category'
import { fetchGetEvents } from '@/api/event'

export default function MeetupList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    '0',
  )
  const [postData, setPostData] = useState<CardData[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  const categoryId = location.pathname.split('/')[2].trim()

  const fetchCategoryData = async () => {
    try {
      const categoryData = await fetchGetCategory(categoryId)
      setCategories(categoryData?.subCategories || [])
    } catch (error) {
      console.error('Error fetching category data', error)
    }
  }

  const fetchEventData = async (subCategoryId?: number) => {
    try {
      if (subCategoryId !== undefined) {
        const eventData = await fetchGetEvents(categoryId, subCategoryId)
        setPostData(eventData)
      } else {
        const allEventData = await fetchGetEvents(categoryId)
        setPostData(allEventData)
      }
    } catch (error) {
      console.error('Error fetching event data', error)
    }
  }

  const handleTabClick = () => {
    setSelectedCategoryId(categoryId)

    if (!categoryId) {
      const fetchAllEventData = async () => {
        const allEventData = await fetchGetEvents(categoryId)
        setPostData(allEventData)
      }
      fetchAllEventData()
    } else {
      navigate(`/meetup-lists/${categoryId}?subcategories=${categoryId}`)
      fetchCategoryData()
    }
  }

  useEffect(() => {
    fetchEventData(categoryId)
    fetchCategoryData(categoryId)
  }, [categoryId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <>
      <CategoryHeader
        title={categoryId === '1' ? 'Crew' : 'Challenge'}
        content={
          categoryId === '1'
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
            <SearchInput handleChange={handleChange} />
          </div>
        </div>

        {/* 카테고리 리스트 */}
        <MainPosts data={postData} isSlide={false} />
      </div>
    </>
  )
}
