import { useState, useEffect } from 'react'
import { FaUserCircle, FaTimes, FaBars } from 'react-icons/fa'
import Logo from '@/assets/images/Logo.svg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Category } from '@/types'
import { fetchGetCategories } from '@/api/category'
import useAuthStore from '@/store/userStore'
import { fetchLogout } from '@/api/logout'
import Swal, { SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface MenuItem {
  to: string
  text: string
  state?: { categoryName: string }
  id?: number
}

const MySwal = withReactContent(Swal)

export default function Header() {
  const [menuToggle, setMenuToggle] = useState<boolean>(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const location = useLocation()
  const store = useAuthStore()
  const generateClassName = (
    base: string,
    condition: boolean,
    additional?: string,
  ) => `${base} ${condition ? additional : ''}`.trim()

  const closeMobileMenu = () => {
    setMenuToggle(false)
  }

  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = async () => {
    MySwal.fire({
      title: '로그아웃',
      text: '정말 로그아웃하시겠습니까?',
      icon: 'question',
      iconColor: '#ff5e2e',
      footer: '로그아웃 시, 서비스 이용에 제약이 걸릴 수 있습니다.',
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
    }).then(async (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const data = await fetchLogout()
        if (data && data.code === 200) {
          store.setUserLogout()
          window.location.href = '/'
        }
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGetCategories()

        const generatedMenuItems = data.map((category: Category) => ({
          to: `/meetup-lists/${category.id}`,
          text: category.name.charAt(0).toUpperCase() + category.name.slice(1),
          state: {
            categoryName:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
          },
        }))

        setMenuItems([...generatedMenuItems, { to: '/chat', text: 'Chat' }])
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchData()
  }, [])

  return (
    <nav className='w-full sticky top-0 z-[999] bg-white border-b shadow-sm'>
      <div className='relative z-[999] w-3/4 desktop:w-8/12 max-w-common-screen-width mx-auto bg-transparent transition-all duration-1000'>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <Link
              to='/'
              className={generateClassName(
                'flex items-center px-2 py-5 text-gray-700',
                true,
              )}
            >
              <img src={Logo} alt='Logo' />
            </Link>
          </div>

          <div className={'hidden md:flex items-center space-x-1'}>
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                state={{ categoryId: item.state, path: location.pathname }}
                className={({ isActive }) =>
                  `min-w-[4rem] px-3 py-5 text-gray-600 hover:text-main-color font-light ${
                    isActive && 'font-semibold text-main-color'
                  }`
                }
              >
                {item.text}
              </NavLink>
            ))}
            <Link
              to={store.user ? '#' : '/login'}
              className={generateClassName(
                'py-5 px-3 hover:text-main-color font-light text-gray-600',
                true,
              )}
              onClick={store.user ? handleLogout : undefined}
            >
              {store.user ? 'Logout' : 'Login'}
            </Link>
            <Link
              to={`/userInfo/${store.user?.id}`}
              className={generateClassName('py-5 px-3', true)}
            >
              <FaUserCircle size={24} />
            </Link>
          </div>

          {/* mobile */}
          <div className='flex items-center tablet:hidden'>
            <button
              onClick={() => setMenuToggle(!menuToggle)}
              className={`transition-transform duration-500 ease-in-out focus:outline-none ${
                menuToggle ? 'transform rotate-90' : ''
              }`}
            >
              {menuToggle ? (
                <FaTimes size={20} className='text-black-color' />
              ) : (
                <FaBars size={20} className='text-black-color' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile list */}
      <div
        className={generateClassName(
          'md:hidden absolute top-full left-0 overflow-hidden transition-all duration-500 ease-in-out bg-white/[.7] w-full',
          true,
          menuToggle ? 'max-h-48' : 'max-h-0',
        )}
      >
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className='block px-4 py-2 text-sm hover:bg-main-light-color'
            onClick={closeMobileMenu}
          >
            {item.text}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
