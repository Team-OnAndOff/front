import Betsy from '@/components/meeting/mypage/Betsy'
import IntroModal from '@/components/meeting/mypage/IntroModal'
import SwiperCard from '@/components/meeting/mypage/SwiperCard'
import TapCard from '@/components/meeting/mypage/Tapcard'
import { FaUserGear } from 'react-icons/fa6'
import { useState } from 'react'
import { Modal } from '@/components/common'
interface UserType {
  text: string
}

export default function MyPage() {
  const [selectedTab, setSelectedTab] = useState(0) // 탭 기능구현 스테이트
  const handleTabClick = (index: number) => {
    // 탭 기능구현 핸들러
    setSelectedTab(index)
  }

  const user: UserType = {
    text: '나 자신에 대해 간단히 소개하자면. 나의 지향점은 항상 협력과 개방적인 소통에 기반을 두고 있습니다. 모두가 자신의 강점을 발휘하고 의견을 나 자신에 대해 간단히 소개하자면. 나의 지향점은 항상 협력과 개방적인',
  }

  // 모달 관련 기능 start
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className='relative h-auto w-1220 backdrop-blur-0'>
        <h4 className='font-bold mt-14 text-size-title'>프로필 정보</h4>
      </div>

      {/* 프로필 카드 start */}
      <section
        className='flex flex-row items-center h-[12.5rem] w-full rounded-big-radius
      border border-solid border-light-gray-color mt-7 shadow-md'
      >
        {/* 이미지박스 */}
        <div className='flex relative items-center justify-center w-[17.5%] h-full '>
          <div className='bg-aquamarine w-[138px] h-[138px] flex items-center justify-center rounded-full overflow-hidden'>
            <img src='../../src/assets/images/Logo.svg' alt='testImg' />
          </div>
        </div>
        {/* 소개박스 */}
        <div className='flex gap-2 flex-col justify-between relative h-full w-[65%] '>
          {/* 아래로 유저 데이터 넣어야함 */}
          <h4 className='mt-6 font-bold text-size-body'>블랙 목티남</h4>
          <p className='font-medium break-keep text-size-subbody'>
            {user.text}
          </p>
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
        <div className='flex relative items-center justify-center w-[17.5%] h-full'>
          {/* 프로필 설정 버튼 s */}
          <div className='absolute z-100 right-[10px] top-[10px]'>
            <button onClick={openModal}>
              <FaUserGear style={{ color: 'red' }} />
            </button>
            {/* <IntroModal
              isOpen={isModalOpen}
              closeModal={closeModal}
            ></IntroModal> */}
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              <IntroModal />
            </Modal>
          </div>
          {/* 프로필 설정 버튼 e */}
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
        <div className='flex border-b-2 border-solid border-main-light-color'>
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
        {/* 프로필설정/신고 */}
        <div>
          <SwiperCard />
        </div>
      </section>
      {/* 모임 개설 탭 end */}
      <div className='relative h-auto w-1220 backdrop-blur-0'>
        <h4 className='font-bold mt-14 text-size-title'>획득한 배지</h4>
      </div>
      <section className='pb-10'>
        <Betsy attend={9} open={100} success={20} bestValse={[1, 0, 1]} />
      </section>
    </>
  )
}
