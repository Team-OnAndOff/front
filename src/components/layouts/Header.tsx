import { useState } from 'react'
import { FaUserCircle, FaTimes, FaBars } from 'react-icons/fa'
import Logo from '@/assets/images/Logo.svg'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuToggle, setMenuToggle] = useState<boolean>(false)

  const generateClassName = (
    base: string,
    condition: boolean,
    additional?: string,
  ) => `${base} ${condition ? additional : ''}`.trim()

  const closeMobileMenu = () => {
    setMenuToggle(false)
  }

  const menuItems = [
    { to: '/crews/0', text: 'Crew' },
    { to: '/challenges/0', text: 'Challenge' },
    { to: '/chat', text: 'Chat' },
    { to: '/login', text: 'Login' },
  ]

  return (
    <nav className='w-full sticky top-0 z-[999] bg-white border-b shadow-sm'>
      <div className='relative z-[999]  w-8/12 max-w-screen-xl mx-auto bg-transparent'>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <div>
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
          </div>

          <div className={`hidden md:flex items-center space-x-1`}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={generateClassName('py-5 px-3 text-gray-700', true)}
              >
                {item.text}
              </Link>
            ))}
            <Link to='/mypage' className={generateClassName('py-5 px-3', true)}>
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
          <Link
            key={index}
            to={item.to}
            className='block px-4 py-2 text-sm hover:bg-main-light-color'
            onClick={closeMobileMenu}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </nav>
  )
}
