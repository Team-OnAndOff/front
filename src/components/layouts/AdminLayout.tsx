import { Link, Outlet, useLocation } from 'react-router-dom'
import { IconType } from 'react-icons'
import { LuUsers } from 'react-icons/lu'
import { BsExclamationTriangle } from 'react-icons/bs'
import { BiCategory, BiHomeAlt } from 'react-icons/bi'
import { IoStorefrontOutline } from 'react-icons/io5'
import { AdminHome } from '@/pages/admin'

export interface AdminMenu {
  name: string
  icon: IconType
  path: string
  description: string
}

export const menus: AdminMenu[] = [
  {
    name: 'Home',
    icon: BiHomeAlt,
    path: '/admin',
    description: 'Home',
  },
  {
    name: '유저 관리',
    icon: LuUsers,
    path: '/admin/users',
    description: 'User Information Management',
  },
  {
    name: '카테고리 관리',
    icon: BiCategory,
    path: '/admin/categories',
    description: 'Category Management',
  },
  {
    name: '모임 관리',
    icon: IoStorefrontOutline,
    path: '/admin/events',
    description: 'Event Information Management',
  },
  {
    name: '신고 관리',
    icon: BsExclamationTriangle,
    path: '/admin/complaints',
    description: 'Detailed management of user reports and event complaints.',
  },
]

export default function AdminLayout() {
  const location = useLocation()
  const selectedMenu = menus.find((menu) => menu.path === location.pathname)

  return (
    <div className='grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[240px_1fr]'>
      <div className='hidden border-r bg-neutral-50 lg:block'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col flex-1 justify-between'>
            <nav className='flex flex-col gap-2 w-full items-start px-4 text-sm font-medium lg:mt-4'>
              {menus.map((menu) => (
                <div
                  key={menu.name}
                  className={`rounded-lg w-full ${
                    selectedMenu?.name === menu.name
                      ? 'bg-main-color'
                      : 'hover:bg-rose-100'
                  }`}
                >
                  <Link
                    to={menu.path}
                    className='flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-neutral-900'
                  >
                    <menu.icon />
                    <span
                      className={`${
                        selectedMenu?.name === menu.name &&
                        'text-main-light-color'
                      }`}
                    >
                      {menu.name}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-neutral-50 px-6'>
          <div className='flex-1'>
            <h1 className='font-semibold text-lg'>{selectedMenu?.name}</h1>
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 lg:gap-8 lg:p-6 h-screen max-h-[calc(100vh-60px)]'>
          <div className='relative w-screen lg:w-full h-full'>
            {location.pathname === '/admin' ? <AdminHome /> : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}
