import React, { useRef,ChangeEvent } from 'react';
//api 새로 불러오는 방식.
interface SearchValue{
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


export default function SearchInput({ handleChange }:SearchValue) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ref를 사용하여 input 필드의 값을 얻기
    const searchValue = inputRef.current?.value;
    console.log(searchValue);
    // 2번째방법. 부모 컴포넌트에서 useState의 / set을 전달받아서 여기에 검색 로직 추가

  };

      //엔터시 지우기 코드
  // const handleClick = () => {
  //   if (inputRef.current) {
  //     inputRef.current.value = '';
  //   }
  // }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        검색
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <svg className="w-4 h-4 text-black-color dark:text-black-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="search"
          id="default-search"
          className="block w-full p-4 text-sm border-2 h-9 rounded-xl text-black-color border-main-color ps-10 focus:outline-none"
          placeholder="모임 검색"
          onChange={handleChange}
        />
        <button
          // onClick={handleClick}
          type="submit"
          className="text-black-color absolute end-2.5 bottom-0 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 "
        >
          ✕
        </button>
      </div>
    </form>
  );
}

