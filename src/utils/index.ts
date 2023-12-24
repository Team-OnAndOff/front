import ScrollToTop from '@/utils/ScollToTop'
import LazyImage from '@/utils/LazyImage'

export { ScrollToTop, LazyImage }

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
