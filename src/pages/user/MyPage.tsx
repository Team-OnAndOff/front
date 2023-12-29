import Betsy from '@/components/meeting/mypage/Betsy'
import IntroModal from '@/components/meeting/mypage/IntroModal'
// import SwiperCard from '@/components/meeting/mypage/SwiperCard'
import TapCard from '@/components/meeting/mypage/Tapcard'
import { FaUserGear } from 'react-icons/fa6'
import { PiSiren } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import { Modal, Declaration } from '@/components/common'
import { useParams, useNavigate } from 'react-router-dom'
import { userInfo } from '@/api/userinfo'
import { userCard } from '@/api/userCard'
import { badgesData } from '@/api/user'
import SwiperCard from '@/components/meeting/mypage/SwiperCard'

interface UserData {
  hashtag: string | null // 추가된 부분
  username: string | null
  image: {
    uploadPath: string | null
  }
  introduction: string
  me?: boolean // me 속성을 선택적으로 지정
}

interface CardNumType {
  id: number
  event: {
    id: number
    image: {
      uploadPath: string | null
    }
    title: string
  }
}
interface BadgeType {
  challenges: { count: number | null }
  crew: { count: number | null }
  made: { count: number | null }
}

export default function MyPage() {
  const [userMe, setUserMe] = useState<boolean | undefined>(undefined) // 마이페이지가 본인건지 확인.
  const [selectedTab, setSelectedTab] = useState(0) // 탭 기능구현 스테이트
  const [tapNumData, setTapNumData] = useState<number[]>([])
  const [userData, setUserData] = useState<UserData | null>(null) //유저 데이터
  const [badges, setBadges] = useState<BadgeType | null>()
  // const [data, setData] = useState() //스와이프  모임 데이터
  const [data, setData] = useState() //스와이프  모임 데이터
  const [swiperData, setSwiperData] = useState('pending')
  const navigate = useNavigate() // 유저없을시 페이지 강제이동
  const [newLoad, setNewLoad] = useState(true) // 컴포넌트 로드

  const handleTabClick = (index: number) => {
    // 탭 기능구현 핸들러
    setSelectedTab(index)
  }
  const { userId } = useParams()
  const attendeeId = Number(userId)
  //유저 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInfo(userId)
        if (response) {
          setUserMe(response?.me)
          setUserData(response)
        }
      } catch (error) {
        console.error('에러 발생: 유저 데이터', error)
        navigate('/')
      }
    }
    fetchData()

    const badges = async () => {
      try {
        const response = await badgesData(userId)
        console.log(response)
        setBadges(response)
      } catch (error) {
        console.error('에러 발생: 배찌 데이터', error)
      }
    }
    badges()
  }, [navigate, userId]) // userData가 변경될 때마다 useEffect 다시 실행

  console.log(userData)

  //슬라이드 모임 데이터 가져오기 이펙트
  useEffect(() => {
    const fetchData = async () => {
      try {
        //모임 데이터 가져오기
        const cardData = await userCard(attendeeId)
        if (!userMe) {
          setSwiperData('made')
          setSelectedTab(2)
        }
        if (cardData.data) {
          const { approved, liked, made, pending } = cardData.data
          const numDataValues = [
            //배열위치로 데이터 위치가 바뀝니다.
            (pending as CardNumType[]).length,
            (approved as CardNumType[]).length,
            (made as CardNumType[]).length,
            (liked as CardNumType[]).length,
          ]
          setTapNumData(numDataValues)
          const dataName = cardData.data[swiperData]
          setData(dataName)
        } else {
          console.error('Data is null or undefined')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [swiperData, newLoad, userId, userMe])

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

  //해시 데이터 가공
  const tagArray = userData?.hashtag
    ?.split(',')
    .filter(Boolean)
    .map((item) => `#${item}`)
  console.log(tagArray)

  return (
    <>
      <div className='relative h-auto w-1220 backdrop-blur-0'>
        <h4 className='font-bold mt-14 text-size-title'>프로필 정보</h4>
      </div>

      {/* 프로필 카드 start */}
      <section className='flex flex-row items-center justify-between w-full h-auto border border-solid shadow-md rounded-big-radius border-light-gray-color mt-7'>
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
        <div className='flex flex-row justify-between w-full'>
          <div className='relative flex flex-col justify-between w-full h-full gap-2 '>
            {/* 아래로 유저 데이터 넣어야함 */}
            {userData ? (
              <h4 className='mt-6 font-bold text-size-body'>
                {userData?.username}
              </h4>
            ) : (
              <h4 className='mt-6 font-bold text-size-body'>로딩중입니다.</h4>
            )}
            <p className='font-medium whitespace-pre-wrap text-size-subbody'>
              {userData?.introduction}
            </p>
            <ul className='flex gap-3 mb-6'>
              {tagArray?.map((item) => (
                <li
                  key={item}
                  className='whitespace-normal py-[0.3rem] px-[0.5rem] my-1 rounded-small-radius bg-main-light-color w-fit text-[0.75rem] text-black-color'
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* 온도박스\ 신고,프로필 설정 버튼 s */}
          <div className='flex relative items-center justify-center w-[17.5%]'>
            {/* 프로필 설정 버튼 s */}
            {userMe && (
              <div className='absolute z-100 right-[10px] top-[5px]'>
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
            )}
            {/* 프로필 설정 버튼 e */}

            {/* 신고 s*/}
            {!userMe && (
              <div className='absolute z-100 right-[10px] top-[10px]'>
                <button onClick={() => openModal('declaration')}>
                  <PiSiren />
                </button>
                <Modal
                  isOpen={isModalOpen && modalType === 'declaration'}
                  closeModal={closeModal}
                >
                  <Declaration
                    type='userReport'
                    closeModal={closeModal}
                    attendeeId={attendeeId}
                  />
                </Modal>
              </div>
            )}
            {/* 신고 e*/}
            {/* 온도 s */}
            <div className='absolute right-[4vw] top-[1.5rem] w-[58px] h-[20px] sm:right-0 sm:top-0  sm:relative sm:w-[68px] sm:h-[33px] bg-main-color rounded-button-radius flex items-center justify-center'>
              <p className='mt-[4px] text-white'>
                36.5
                <span className='w-[3px] h-[3px] mt-1 ml-0.5 bor absolute rounded-small-radius border border-solid border-white'></span>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 프로필카드 end */}

      {/* 모임 텝  start*/}
      <section>
        <div className='flex border-b-2 border-solid border-main-light-color'>
          {userMe && (
            <>
              <TapCard
                name={'대기 중인 모임'}
                numData={tapNumData ? tapNumData[0] : 0}
                isSelected={selectedTab === 0}
                onClick={() => {
                  handleTabClick(0)
                  setSwiperData('pending')
                }}
              />
              <TapCard
                name={'참여 중인 모임'}
                numData={tapNumData ? tapNumData[1] : 0}
                isSelected={selectedTab === 1}
                onClick={() => {
                  handleTabClick(1)
                  setSwiperData('approved')
                }}
              />
              <TapCard
                name={'내가 개설한 모임'}
                numData={tapNumData ? tapNumData[2] : 0}
                isSelected={selectedTab === 2}
                onClick={() => {
                  handleTabClick(2)
                  setSwiperData('made')
                }}
              />
              <TapCard
                name={'내가 찜한 모임'}
                numData={tapNumData ? tapNumData[3] : 0}
                isSelected={selectedTab === 3}
                onClick={() => {
                  handleTabClick(3)
                  setSwiperData('liked')
                }}
              />
            </>
          )}
          {!userMe && (
            <TapCard
              name={'내가 개설한 모임'}
              numData={tapNumData ? tapNumData[2] : 0}
              isSelected={selectedTab === 2}
              onClick={() => {
                handleTabClick(2)
                setSwiperData('made')
              }}
            />
          )}
        </div>
        <div>
          <SwiperCard
            selectedTab={selectedTab}
            swiperData={data}
            userId={userId}
            setNewLoad={setNewLoad}
          />
        </div>
      </section>
      {/* 모임 개설 탭 end */}
      <div className='relative h-auto w-1220 backdrop-blur-0'>
        <h4 className='font-bold mt-14 text-size-title'>획득한 배지</h4>
      </div>
      <section className='pb-10'>
        <Betsy
          attend={badges?.crew.count}
          open={badges?.made.count}
          success={badges?.challenges.count}
          bestValse={[0, 0, 0]}
        />
      </section>
    </>
  )
}
