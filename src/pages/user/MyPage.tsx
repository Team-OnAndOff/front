import Betsy from '@/components/meeting/mypage/Betsy'
import IntroModal from '@/components/meeting/mypage/IntroModal'
import SwiperCard from '@/components/meeting/mypage/SwiperCard'
import TapCard from '@/components/meeting/mypage/Tapcard'
import { FaUserGear, FaRegFaceGrin } from 'react-icons/fa6'
import { PiSiren } from 'react-icons/pi'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, Declaration } from '@/components/common'
import Evaluation from '@/components/meeting/mypage/Evaluation'
import { useParams, useNavigate } from 'react-router-dom'

interface UserData {
  username: string | null
  image: {
    uploadPath: string | null
  }
  introduction: string
}

export default function MyPage() {
  const [selectedTab, setSelectedTab] = useState(0) // 탭 기능구현 스테이트
  const [userData, setUserData] = useState<UserData | null | undefined>(null) //유저 데이터
  const navigate = useNavigate() // 유저없을시 페이지 강제이동
  const handleTabClick = (index: number) => {
    // 탭 기능구현 핸들러
    setSelectedTab(index)
  }
  const { userId } = useParams()

  //유저 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${userId}/info`,
        )
        const data = await response.data.data
        setUserData(data)
      } catch (error) {
        console.error('에러 발생:', error)
        navigate('/')
      }
    }
    fetchData()
  }, []) // userData가 변경될 때마다 useEffect 다시 실행

  console.log(userData)

  // 모달 관련 기능 start
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = (type: string) => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='relative h-auto w-1220 backdrop-blur-0'>
        <h4 className='font-bold mt-14 text-size-title'>프로필 정보</h4>
      </div>

      {/* 프로필 카드 start */}
      <section
        className='flex flex-row items-center h-[12.5rem] w-full rounded-big-radius
      border border-solid border-light-gray-color mt-7 shadow-md justify-between'
      >
        {/* 이미지박스 */}
        <div className='p-3 flex relative items-center justify-center w-min-[100px] h-auto '>
          <div className='bg-aquamarine w-[150px] h-[150px] flex items-center justify-center rounded-full overflow-hidden'>
            <img
              src={userData?.image?.uploadPath || 'none.jpg'}
              alt='프로필사진'
            />
          </div>
        </div>
        {/* 소개박스 */}
        <div className='flex gap-2 flex-col justify-between relative h-full w-[65%] '>
          {/* 아래로 유저 데이터 넣어야함 */}
          {userData ? (
            <h4 className='mt-6 font-bold text-size-body'>
              {userData?.username}
            </h4>
          ) : (
            <h4 className='mt-6 font-bold text-size-body'>로딩중입니다.</h4>
          )}
          <p className='pl-1.5 font-medium break-keep text-size-subbody'>
            {userData?.introduction}
          </p>
          <ul className='flex gap-3 mb-6'>
            <li className='p-1 px-3 my-1 rounded-small-radius bg-main-light-color w-fit text-subbody text-black-color'>
              #테스트
            </li>
            <li className='p-1 px-3 my-1 rounded-small-radius bg-main-light-color w-fit text-subbody text-black-color'>
              #테스트
            </li>
            <li className='p-1 px-3 my-1 rounded-small-radius bg-main-light-color w-fit text-subbody text-black-color'>
              #테스트
            </li>
          </ul>
        </div>
        {/* 온도박스\ 신고,프로필 설정 버튼  */}
        <div className='flex relative items-center justify-center w-[17.5%] h-full'>
          {/* 프로필 설정 버튼 s */}
          <div className='absolute z-100 right-[10px] top-[10px]'>
            <button onClick={() => openModal('profile')}>
              <FaUserGear style={{ color: 'red' }} />
            </button>
            <Modal
              isOpen={isModalOpen && modalType === 'profile'}
              closeModal={closeModal}
            >
              <IntroModal
                closeModal={closeModal}
                userId={userId}
                myUserData={userData}
              />
            </Modal>
          </div>
          {/* 프로필 설정 버튼 e */}

          {/* 신고 s*/}
          <div className='absolute z-100 right-[10px] top-[30px]'>
            <button onClick={() => openModal('declaration')}>
              <PiSiren />
            </button>
            <Modal
              isOpen={isModalOpen && modalType === 'declaration'}
              closeModal={closeModal}
            >
              <Declaration closeModal={closeModal} userId={userId} />
            </Modal>
          </div>
          {/* 신고 e*/}

          {/* 평가 s*/}
          <div className='absolute z-100 right-[10px] top-[50px]'>
            <button onClick={() => openModal('evaluation')}>
              <FaRegFaceGrin />
            </button>
            <Modal
              isOpen={isModalOpen && modalType === 'evaluation'}
              closeModal={closeModal}
            >
              <Evaluation closeModal={closeModal} />
            </Modal>
          </div>
          {/* 평가 e*/}

          <div className='w-[68px] h-[33px] bg-main-color rounded-button-radius flex items-center justify-center'>
            <p className='mt-[4px] text-white'>
              36.5
              <span className='w-[3px] h-[3px] mt-1 ml-0.5 bor absolute rounded-small-radius border border-solid border-white'></span>
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
        <div>
          <SwiperCard selectedTab={selectedTab} />
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
