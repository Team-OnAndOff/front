import { useState, useEffect } from 'react'
import { FaUserCircle, FaTimes, FaBars } from 'react-icons/fa'
import Logo from '@/assets/images/Logo.svg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const store = useAuthStore()

  const generateClassName = (
    base: string,
    condition: boolean,
    additional?: string,
  ) => `${base} ${condition ? additional : ''}`.trim()

  const closeMobileMenu = () => {
    setMenuToggle(false)
  }

  const handleBasicInfoClick = () => {
    MySwal.fire({
      title: '로그인이 필요한 기능입니다!',
      icon: 'warning',
      iconColor: '#ff5e2e',
      footer: '로그인 페이지로 이동하시겠습니까?',
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        navigate('/login')
      }
    })
  }

  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = async () => {
    MySwal.fire({
      title: '로그아웃',
      text: '정말 로그아웃하시겠습니까?',
      icon: 'question',
      iconColor: '#ff5e2e',
      confirmButtonColor: '#ff5e2e',
      cancelButtonColor: '#3a823f',
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

  if (location.pathname === '/login') return null

  return (
    <nav className='w-full sticky top-0 z-[999] dark:bg-dark-main-color bg-white border-b border-white dark:border-dark-main-color shadow-sm py-2 transition-smooth'>
      <div className='relative z-[999] w-3/4 desktop:w-8/12 max-w-common-screen-width mx-auto bg-transparent transition-smooth'>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <Link
              to='/'
              className={generateClassName('flex items-center ', true)}
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
                  `min-w-[4rem] px-3 py-5 text-gray-600 transition-smooth dark:text-dark-light-color hover:text-main-color font-light ${
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
                'py-5 px-3 hover:text-main-color font-light text-gray-600 transition-smooth dark:text-dark-light-color',
                true,
              )}
              onClick={store.user ? handleLogout : undefined}
            >
              {store.user ? 'Logout' : 'Login'}
            </Link>
            {store.user ? (
              <Link
                to={`/userinfo/${store.user?.id}`}
                className={generateClassName('py-5 px-3', true)}
              >
                <img
                  alt='프로필 사진'
                  className='w-[24px] h-[24px] rounded-full'
                  src={store.user.image?.uploadPath}
                />
              </Link>
            ) : (
              <Link
                to='#'
                onClick={handleBasicInfoClick}
                className={generateClassName('py-5 px-3', true)}
              >
                <i className='dark:fill-dark-light-color transition-smooth'>
                  <FaUserCircle size={24} fill='dark' />
                </i>
              </Link>
            )}
          </div>

          {/* mobile */}
          <div className='flex items-center tablet:hidden'>
            <button
              onClick={() => setMenuToggle(!menuToggle)}
              className={`transition-smooth focus:outline-none ${
                menuToggle ? 'transform rotate-90' : ''
              }`}
            >
              {menuToggle ? (
                <FaTimes
                  size={20}
                  className='fill-black-color dark:fill-dark-light-color transition-smooth'
                />
              ) : (
                <FaBars
                  size={20}
                  className='fill-black-color dark:fill-dark-light-color transition-smooth'
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile list */}
      <div
        className={generateClassName(
          'md:hidden absolute top-full left-0 overflow-hidden transition-smooth bg-white/[.7] dark:bg-dark-main-color/[.5] text-black-color dark:text-dark-light-color font-light w-full',
          true,
          menuToggle ? 'max-h-48' : 'max-h-0',
        )}
      >
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className='block px-4 py-2 text-sm hover:bg-main-light-color hover:dark:text-white hover:dark:bg-dark-main-color/[.8]'
            onClick={closeMobileMenu}
          >
            {item.text}
          </NavLink>
        ))}

        <NavLink
          to={store.user ? '#' : '/login'}
          className='block px-4 py-2 text-sm hover:bg-main-light-color hover:dark:text-white hover:dark:bg-dark-main-color/[.8]'
          onClick={store.user ? handleLogout : closeMobileMenu}
        >
          {store.user ? 'Logout' : 'Login'}
        </NavLink>
      </div>
    </nav>
  )
}
