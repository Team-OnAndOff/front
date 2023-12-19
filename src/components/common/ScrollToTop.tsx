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
          } fixed bottom-[95px] right-[40px] w-[30px] h-[30px] bg-white rounded-full drop-shadow-xl hover:drop-shadow-2xl`}
        >
          <FaArrowAltCircleUp fill='#333' size={30} />
        </button>
      )}
    </>
  )
}
