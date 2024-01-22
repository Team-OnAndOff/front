import { useState } from 'react'
import { useDarkSide } from '@/hooks'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === 'light' ? true : false,
  )

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme)
    setDarkSide(checked)
  }

  return (
    <>
      <div className='fixed bottom-[115px] right-2 sm:right-[40px]'>
        <DarkModeSwitch
          checked={darkSide}
          onChange={toggleDarkMode}
          size={38}
          className='animate-spinSlow'
        />
      </div>
    </>
  )
}
