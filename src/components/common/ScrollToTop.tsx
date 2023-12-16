import { useState, useEffect } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = 'smooth'
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {showButton && (
        <button
          type='button'
          onClick={backToTop}
          className={` ${
            showButton ? `inline-block` : `hidden`
          } fixed bottom-[40px] right-[40px] rounded-full shadow-md hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-0 active:shadow-xl transition duration-150 ease-in-out cursor-pointer`}
        >
          <FaArrowAltCircleUp fill='#3a823f' size={30} />
        </button>
      )}
    </>
  )
}
