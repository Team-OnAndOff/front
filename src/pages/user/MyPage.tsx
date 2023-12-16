import { useState } from 'react'

export default function MyPage() {
  const [selectedTab, setSelectedTab] = useState(0)

  interface UserType {
    text: string
  }
  interface TapButton {
    name: string
    numData: number
    isSelected: boolean // isSelected 속성 추가
    onClick: () => void // 클릭 이벤트 핸들러 추가
  }

  const handleTabClick = (index: number) => {
    setSelectedTab(index)
  }

  const TapCard = ({ name, numData, isSelected, onClick }: TapButton) => {
    return (
      <div
        className={`flex gap-0.5 mr-[20px] font-bold mt-14 text-size-title ${
          isSelected ? 'opacity-100' : 'opacity-60'
        }`}
        onClick={onClick}
      >
        <h4>{name}</h4>
        <div className='w-[42px] h-[33px] bg-main-color rounded-button-radius flex items-center justify-center'>
          <p className='font-normal text-center text-white text-size-body'>
            {numData}
          </p>
        </div>
      </div>
    )
  }

  const user: UserType = {
    text: '나 자신에 대해 간단히 소개하자면. 나의 지향점은 항상 협력과 개방적인 소통에 기반을 두고 있습니다. 모두가 자신의 강점을 발휘하고 의견을 나 자신에 대해 간단히 소개하자면. 나의 지향점은 항상 협력과 개방적인',
  }

  return (
    <>
      <div className='relative h-auto w-1220 backdrop-blur-0'>
        <p className='font-bold mt-14 text-size-title'>프로필 정보</p>
      </div>

      {/* 프로필 카드 start */}
      <section
        className='flex flex-row items-center h-[12.5rem] w-full rounded-big-radius
      border border-solid border-light-gray-color mt-7 shadow-md'
      >
        {/* 이미지박스 */}
        <div className='flex relative items-center justify-center w-[17.5%] h-full border border-solid border-light-gray-colo'>
          <div className='bg-aquamarine w-[138px] h-[138px] flex items-center justify-center rounded-full overflow-hidden'>
            <img src='../../src/assets/images/Logo.svg' alt='testImg' />
          </div>
        </div>
        {/* 소개박스 */}
        <div className='flex gap-2 flex-col justify-between relative h-full border border-solid w-[65%] border-light-gray-colo'>
          {/* 아래로 유저 데이터 넣어야함 */}
          <h4 className='mt-6 font-bold text-size-body'>블랙 목티남</h4>
          <p className='font-bold break-keep text-size-subbody'>{user.text}</p>
          <ul className='flex gap-3 mb-6'>
            <li className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-subbody text-black-color'>
              #테스트
            </li>
            <li className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-subbody text-black-color'>
              #테스트
            </li>
            <li className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-subbody text-black-color'>
              #테스트
            </li>
          </ul>
        </div>
        {/* 온도박스 */}
        <div className='flex relative items-center justify-center w-[17.5%] h-full border border-solid border-light-gray-colo'>
          <div className='w-[68px] h-[33px] bg-main-color rounded-button-radius flex items-center justify-center'>
            <p className='mt-[5px] text-white'>
              36.5
              <span className='w-[3px] h-[3px] mt-1 ml-0.5 bor absolute rounded-md border border-solid border-white'></span>
            </p>
          </div>
        </div>
      </section>
      {/* 프로필카드 end */}

      {/* 모임 텝  start*/}
      <section>
        <div className='flex'>
          <TapCard
            name={'대기 중인 모임'}
            numData={1}
            isSelected={selectedTab === 0}
            onClick={() => handleTabClick(0)}
          />
          <TapCard
            name={'참여 중인 모임'}
            numData={2}
            isSelected={selectedTab === 1}
            onClick={() => handleTabClick(1)}
          />
          <TapCard
            name={'내가 개설한 모임'}
            numData={3}
            isSelected={selectedTab === 2}
            onClick={() => handleTabClick(2)}
          />
          <TapCard
            name={'내가 찜한 모임'}
            numData={4}
            isSelected={selectedTab === 3}
            onClick={() => handleTabClick(3)}
          />
        </div>
      </section>
      {/* 모임 개컬 탭 end */}
    </>
  )
}
