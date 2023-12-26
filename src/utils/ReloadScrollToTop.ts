import { useEffect } from 'react'

export default function ReloadScrollToTop() {
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0)
    }
  }, [])
}
