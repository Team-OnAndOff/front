import { Outlet } from 'react-router-dom'
import { Header, Footer } from '@/components/layouts'
import { ScrollToTop } from '@/components/common'

export default function Layout() {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='flex-1 w-8/12 max-w-common-screen-width justify-self-center px-[20px]'>
        <Outlet />
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  )
}
