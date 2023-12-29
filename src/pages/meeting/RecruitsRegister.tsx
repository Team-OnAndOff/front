import { Button, TextArea } from '@/components/common'
import { MeetDetailInfo } from '@/components/meeting'
import { useNavigate, useParams } from 'react-router-dom'
import { FaQuestion } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { fetchGetEventDetail } from '@/api/event'
import { EventDetailData } from '@/types'
import { fetchPostRecruitRegister } from '@/api/event'
import Swal from 'sweetalert2'

export interface DataProps {
  answer: string
}

export default function RecruitsRegister() {
  const [postDetail, setPostDetail] = useState<EventDetailData | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>()
  const { postId } = useParams()
  const eventId = Number(postId)
  const navigate = useNavigate()
  const REQUIRED_MESSAGE = '*필수로 입력해주세요.'

  useEffect(() => {
    const fetchDetailData = async (eventId: number) => {
      try {
        const data = await fetchGetEventDetail(eventId)
        setPostDetail(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDetailData(eventId)
  }, [eventId])
  const getErrorMessage = <T extends keyof DataProps>(field: T) => {
    return errors[field] ? (
      <p className='block mt-2 text-red-500 text-size-subbody dark:text-main-hover-color smooth-color'>
        {errors[field]?.message}
      </p>
    ) : null
  }

  const handleCancelClick = () => {
    navigate(-1)
  }
  const onSubmit: SubmitHandler<DataProps> = async (
    registerData: DataProps,
  ) => {
    const data = await fetchPostRecruitRegister(eventId, registerData)
    if (data && data.code === 200) {
      Swal.fire({
        icon: 'success',
        title: '신청 완료!',
        text: '방장이 승인할 때 까지 기다려주세요!',
        confirmButtonColor: '#ff5e2e',
      })
      setTimeout(() => {
        Swal.close()
        navigate('/')
      }, 2000)
    }
  }
  return (
    <>
      {postDetail && (
        <div className='flex flex-col'>
          <form>
            <div className='mx-auto mt-6 border-b-2 pb-1.5 border-b-light-gray-color dark:border-b-dark-light-color'>
              <h3 className='mt-1 text-3xl font-bold dark:text-dark-light-color'>
                {postDetail.category.parentId?.name} 참여하기
              </h3>
            </div>
            <div className='mt-6'>
              <h3 className='mt-1 text-size-title dark:text-dark-light-color'>
                참여하고 싶은 모임 정보
              </h3>
            </div>
            <div className='mt-6'>
              <MeetDetailInfo
                online={postDetail.online}
                startDate={postDetail.challengeStartDate}
                endDate={postDetail.challengeEndDate}
                title={postDetail.title}
                content={postDetail.content}
                place={postDetail.address?.detail1}
                memNum={postDetail.recruitment}
                postImageUrl={postDetail.image.uploadPath}
                hashTags={postDetail.hashTags}
                parentId={postDetail.category?.parentId?.id}
                careerCategories={postDetail.careerCategories}
                eventId={eventId}
                likes={postDetail.likes}
                hostId={postDetail.user.id}
              />
            </div>

            <div className='mt-6'>
              <div className='flex items-center'>
                <FaQuestion
                  size={24}
                  className='fill-main-color dark:fill-dark-light-color smooth-transition'
                />
                <h3 className='mt-1 ml-1 text-size-title dark:text-dark-light-color smooth-transition'>
                  {postDetail.question}
                </h3>
              </div>
              <div className='mt-3'>
                <TextArea
                  register={register('answer', {
                    required: REQUIRED_MESSAGE,
                  })}
                  width='w-full'
                  placeholder='방장님이 참고하는 질문이니 성실히 답변해주세요!'
                />
                {getErrorMessage('answer')}
              </div>
            </div>

            <div className='mt-6'>
              <h3 className='text-xl font-bold desktop:text-size-title smooth-color dark:text-dark-light-color'>
                모두가 즐거운 모임이 될 수 있도록 함께 지켜주세요
              </h3>
              <div className='mt-3 border-2 dark:bg-dark-main-color smooth-color border-light-gray-color min-h-[200px] rounded-xl px-10 py-3 box-border dark:border-sub-color'>
                <div className='flex flex-col basis-2/3 pt-5 min-h-[200px]'>
                  <div className='flex items-center'>
                    <div className='flex items-center justify-center w-5 h-5 mr-2 text-center rounded-full bg-dark-gray-color'>
                      <span className='font-bold text-center text-main-color text-size-subbody dark:text-dark-main-color smooth-color'>
                        1
                      </span>
                    </div>
                    <span className='font-bold text-size-body text-sub-color dark:text-dark-light-color smooth-color'>
                      모임 시작 전 부득이하게 참여가 어려워진 경우, 반드시
                      모임장에게 미리 알려주세요.
                    </span>
                  </div>
                  <div className='flex items-center mt-6'>
                    <div className='flex items-center justify-center w-5 h-5 mr-2 text-center rounded-full bg-dark-gray-color'>
                      <span className='font-bold text-main-color text-size-subbody dark:text-dark-main-color smooth-color'>
                        2
                      </span>
                    </div>
                    <span className='font-bold text-size-body text-sub-color dark:text-dark-light-color smooth-color'>
                      나와 다른 의견에도 귀 기울이며, 함께하는 멤버들을 존중하는
                      태도를 지켜주세요.
                    </span>
                  </div>
                </div>
                <div className='pb-3'>
                  <input
                    type='checkbox'
                    id='agreecheck'
                    className='w-4 h-4 mr-1 cursor-pointer accent-main-color'
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                  />
                  <label
                    htmlFor='agreecheck'
                    className='ml-3 font-semibold text-size-body dark:text-main-hover-color desktop:text-size-title text-sub-color'
                  >
                    모임의 이용 규칙을 지키겠습니다!
                  </label>
                  {isChecked ? null : (
                    <p className='font-light dark:text-sub-color text-main-color text-size-body'>
                      * 필수 체크 항목입니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='flex gap-3 justify-center mt-6 p-2.5'>
              {isChecked && (
                <Button fill='activeFill' onClick={handleSubmit(onSubmit)}>
                  신청하기
                </Button>
              )}

              <Button fill='border' onClick={handleCancelClick}>
                뒤로가기
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
