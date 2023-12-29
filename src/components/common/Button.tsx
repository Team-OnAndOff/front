import { useState } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit'
  children: string
  onClick: () => void
  fill: 'activeFill' | 'border' | 'inactiveFill'
  width?: string
  fontSize?: string
}

const getButtonStyle = (fill: ButtonProps['fill']) => {
  switch (fill) {
    case 'activeFill':
      return 'bg-main-color dark:bg-sub-color hover:dark:bg-sub-hover-color text-white hover:bg-main-hover-color'
    case 'inactiveFill':
      return 'bg-light-gray-color dark:bg-dark-gray-color text-black-color'
    case 'border':
      return 'border border-main-color dark:border-sub-color hover:dark:bg-dark-light-color text-black-color bg-white hover:bg-main-light-color dark:bg-light-gray-color'
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
  fontSize,
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
      className={`py-2 px-2 rounded-button-radius ${width} ${fontSize} transition-all duration-300 ${
        isClicked && 'transform scale-90'
      } ${getButtonStyle(fill)}`}
    >
      {children}
    </button>
  )
}
