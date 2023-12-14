import { Outlet } from 'react-router-dom'
import { Header, Footer } from '@/components/layouts'

export default function Layout() {
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
