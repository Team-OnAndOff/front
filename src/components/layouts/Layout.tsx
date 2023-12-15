import { Outlet } from 'react-router-dom'
import { Header, Footer } from '@/components/layouts'
import { ScrollToTop } from '@/components/common'

export default function Layout() {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='flex-1 w-common-screen-width max-w-common-screen-width justify-self-center'>
        <Outlet />
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  )
}
