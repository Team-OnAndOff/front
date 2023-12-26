import ScrollToTop from '@/utils/ScrollToTop'
import LazyImage from '@/utils/LazyImage'
import HandleSearchParams from '@/utils/HandleSearchParams'

export { ScrollToTop, LazyImage, HandleSearchParams }

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
