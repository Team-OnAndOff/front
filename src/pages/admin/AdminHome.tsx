import { Link } from 'react-router-dom'
import { HomeCard } from '@/components/admin'
import { menus } from '@/components/layouts/AdminLayout'

export default function AdminHome() {
  console.log(menus)
  return (
    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {menus.map((menu) => (
        <Link key={menu.name} to={menu.path}>
          <HomeCard menu={menu} />
        </Link>
      ))}
    </div>
  )
}
