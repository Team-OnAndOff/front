import { Outlet } from 'react-router-dom'
import { Header, Footer } from '@/components/layouts'
import { FloatingButton, ScrollToTop } from '@/components/common'

export default function Layout() {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='flex-1 w-8/12 max-w-common-screen-width justify-self-center'>
        <Outlet />
      </div>
      <FloatingButton />
      <ScrollToTop />
      <Footer />
    </div>
  )
}
