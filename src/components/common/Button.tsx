import { useState } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit'
  children: string
  onClick: () => void
  fill: 'activeFill' | 'border' | 'inactiveFill'
  width?: string
}

const getButtonStyle = (fill: ButtonProps['fill']) => {
  switch (fill) {
    case 'activeFill':
      return 'bg-main-color text-white hover:bg-main-hover-color'
    case 'inactiveFill':
      return 'bg-light-gray-color text-black-color'
    case 'border':
      return 'border border-main-color bg-white hover:bg-main-light-color'
    default:
      return ''
  }
}

export default function Button({
  type = 'button',
  children,
  onClick,
  fill = 'activeFill',
  width = 'w-small-button',
}: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)

    setTimeout(() => {
      setIsClicked(false)
      onClick()
    }, 300)
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`py-2 px-2 rounded-button-radius ${width} transition-all duration-300 ${
        isClicked && 'transform scale-90'
      } ${getButtonStyle(fill)}`}
    >
      {children}
    </button>
  )
}
