import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 페이지 이동 시, 새로고침
export default function NewPageScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
