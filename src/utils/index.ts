import NewPageScrollToTop from '@/utils/NewPageScrollToTop'
import ReloadScrollToTop from '@/utils/ReloadScrollToTop'
import CardSkeleton from '@/utils/CardSkeleton'
import HandleSearchParams from '@/utils/HandleSearchParams'
import { ChatUser } from '@/types'

export {
  NewPageScrollToTop,
  ReloadScrollToTop,
  CardSkeleton,
  HandleSearchParams,
}

export type CategoryType = {
  categoryId: number
  subCategoryId: number
}

export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const formatDateTime = (inputDate: Date) => {
  const date = new Date(inputDate)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

// 채팅 유저정보 map으로 변환
export const convertArrayToMap = (users: ChatUser[]) => {
  const resultMap = new Map()
  users.forEach((user) => {
    const { _id, ...rest } = user
    resultMap.set(_id, rest)
  })

  return resultMap
}
