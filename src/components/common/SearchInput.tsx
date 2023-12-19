import React, { useRef, ChangeEvent } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

//api 새로 불러오는 방식.
interface SearchValue {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleChange }: SearchValue) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // ref를 사용하여 input 필드의 값을 얻기
    const searchValue = inputRef.current?.value
    console.log(searchValue)
    // 2번째방법. 부모 컴포넌트에서 useState의 / set을 전달받아서 여기에 검색 로직 추가
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only'
      >
        검색
      </label>
      <div className='relative'>
        <i className='absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3'>
          <FaSearch fill='#111' />
        </i>
        <input
          ref={inputRef}
          type='search'
          id='default-search'
          className='w-full p-4 text-sm border-2 h-9 rounded-xl text-black-color border-dark-gray-color ps-10 focus:border-main-color focus:outline-none'
          placeholder='제목이나 태그를 입력해주세요.'
          onChange={handleChange}
        />
        <button
          onClick={handleClick}
          className='text-black-color absolute end-1 bottom-[3px] focus:outline-none font-medium rounded-lg text-sm px-4 py-2 '
        >
          <FaTimes fill='#666' />
        </button>
      </div>
    </form>
  )
}
