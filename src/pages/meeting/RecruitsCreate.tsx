import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { GoPlus } from 'react-icons/go'
import { CiCalendar } from 'react-icons/ci'
import dayjs from 'dayjs'
import {
  RadioButtons,
  Button,
  // SelectBox,
  Inputs,
  TextArea,
} from '@/components/common/index'
// import RecruitsCheckBox from '@/components/meeting/recruits/RecruitsCheckBox'
import RecruitsTitle from '@/components/meeting/recruits/RecruitsTitle'
import RecruitsDayPick from '@/components/meeting/recruits/RecruitsDayPick'
import RecruitsRangePick from '@/components/meeting/recruits/RecruitsRangePick'
import RecruitsAddress from '@/components/meeting/recruits/RecruitsAddress'

// import InputsHashTag from '@/components/common/InputsHashTag'

interface FormData {
  category: number
  meetingRule: number
  recruitTarget: number[]
  selectedCategory: number
  selectedDate: Date | null
  recruitTitle: string
  recruitContent: string
  recruitMembers: number
  zonecode: string
  address: string
  detailAddress: string
  tags: string[]
  recruitQuestion: string
}

export default function RecruitsCreate() {
  const [showDayPick, setShowDayPick] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedMeetingRule, setSelectedMeetingRule] = useState<number | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tags: [],
      selectedDate: new Date(),
    },
  })

  const navigate = useNavigate()
  const currentDate = dayjs(watch('selectedDate')).format('YYYY-MM-DD')

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    if (event) {
      event.preventDefault()
    }
    console.log('Form Data:', data)
  }

  const handleButtonClick = () => {
    setTimeout(() => {
      navigate(-1)
    }, 200)
  }

  const REQUIRED_MESSAGE = '*필수로 입력해주세요.'

  const getErrorMessage = (field: keyof FormData) => {
    return errors[field] ? (
      <p className='block mt-2 text-red-500 text-size-subbody'>
        {errors[field]?.message}
      </p>
    ) : null
  }

  const handleDateChange = (date: Date) => {
    setValue('selectedDate', date)
    setShowDayPick(false)
  }

  const handleDayPickClick = () => {
    setShowDayPick(!showDayPick)
  }

  // const handleRangeSelect = () => {
  //   setShowDayPick(!showDayPick)
  // }

  const handleCategoryChange = (value: number) => {
    setSelectedCategory(value)
    setValue('category', value)
  }

  const handleMeetingRulesChange = (value: number) => {
    setSelectedMeetingRule(value)
    setValue('meetingRule', value)
  }

  // const handleRecruitTarget = (value: number[]) => {
  //   setValue('recruitTarget', value)
  // }

  const handleAddress = (data: { zonecode: string; address: string }) => {
    setValue('zonecode', data.zonecode)
    setValue('address', data.address)
  }

  const category = [
    { text: '크루', value: 1 },
    { text: '챌린지', value: 2 },
  ]

  const meetingRule = [
    { text: '온라인', value: 1 },
    { text: '오프라인', value: 2 },
  ]

  // const target = [
  //   { value: 1, text: '직장인' },
  //   { value: 2, text: '학생' },
  //   { value: 3, text: '취준생' },
  // ]

  // const options = [
  //   { value: 1, label: '외국어' },
  //   { value: 2, label: '학생' },
  //   { value: 3, label: '취준생' },
  // ]

  return (
    <>
      <div className='mx-auto my-20'>
        <div className='flex justify-center mx-auto font-bold text-size-title'>
          나만의 모임 생성
        </div>
        <form className='flex flex-col gap-10 my-20'>
          <div className='flex'>
            <RecruitsTitle>카테고리 설정</RecruitsTitle>
            <div className='flex flex-col'>
              <RadioButtons
                data={category}
                name='category'
                register={register('category', { required: REQUIRED_MESSAGE })}
                clickChange={handleCategoryChange}
                selectedValue={selectedCategory}
              />
              {getErrorMessage('category')}
            </div>
          </div>
          {selectedCategory === 2 && (
            <div className='flex'>
              <RecruitsTitle>챌린지 기간</RecruitsTitle>
              <div className='flex gap-3'>
                <div>
                  <div
                    className='flex p-1 px-3 border-2 rounded-md cursor-pointer'
                    onClick={handleDayPickClick}
                  >
                    <CiCalendar />
                    {currentDate}
                  </div>
                  {showDayPick && <RecruitsRangePick />}
                </div>
                <p className='pt-2 font-bold'>~</p>
                <div>
                  <div
                    className='flex p-1 px-3 border-2 rounded-md cursor-pointer '
                    onClick={handleDayPickClick}
                  >
                    <CiCalendar />
                    {currentDate}
                  </div>
                  {showDayPick && <RecruitsRangePick />}
                </div>
              </div>
            </div>
          )}
          {selectedCategory !== 2 && (
            <div className='flex'>
              <RecruitsTitle>모임 시작일</RecruitsTitle>
              <div>
                <div
                  className='flex items-center gap-1 p-1 px-3 border-2 rounded-md cursor-pointer w-fit'
                  onClick={handleDayPickClick}
                >
                  <CiCalendar />
                  {currentDate}
                </div>
                {showDayPick && (
                  <RecruitsDayPick onDayClick={handleDateChange} />
                )}
              </div>
            </div>
          )}
          <div className='flex'>
            <RecruitsTitle>세부 카테고리</RecruitsTitle>
            {/* <SelectBox
              bgColor='light-gray-color'
              textSize='size-body'
              options={options}
              // onChange={register('selectedCategory', { required: true })} */}
            {/* /> */}
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 대상</RecruitsTitle>
            {/* <RecruitsCheckBox
              options={target}
              name='recruitTarget'
              register={register('recruitTarget', {
                required: REQUIRED_MESSAGE,
              })}
              setValue={handleRecruitTarget}
            /> */}
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 제목 글</RecruitsTitle>
            <div className='flex flex-col w-1/2'>
              <Inputs
                width='w-full'
                register={register('recruitTitle', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              {getErrorMessage('recruitTitle')}
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 내용 글</RecruitsTitle>
            <div className='flex flex-col w-1/2'>
              <TextArea
                placeholder='모집에 대한 설명을 작성해주세요'
                width='w-full'
                height='h-40'
                register={register('recruitContent', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              {getErrorMessage('recruitContent')}
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 할 인원</RecruitsTitle>
            <div className='flex items-end gap-3'>
              <Inputs
                width='w-12'
                register={register('recruitMembers', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              <p className='mb-1 text-text-subbody text-dark-gray-color'>명</p>
            </div>
            {getErrorMessage('recruitMembers')}
          </div>
          <div className='flex'>
            <RecruitsTitle>만남 유형</RecruitsTitle>
            <RadioButtons
              data={meetingRule}
              name='meetingRule'
              register={register('meetingRule', { required: REQUIRED_MESSAGE })}
              clickChange={handleMeetingRulesChange}
              selectedValue={selectedMeetingRule}
            />
            {getErrorMessage('meetingRule')}
          </div>
          <div className='flex'>
            <RecruitsTitle>오프라인 장소</RecruitsTitle>
            <div className='flex flex-col w-1/2'>
              <div className='flex flex-wrap justify-between gap-5'>
                <RecruitsAddress onComplete={handleAddress} />
                <Inputs
                  placeholder='상세주소'
                  width='w-full'
                  register={register('detailAddress', {
                    required: REQUIRED_MESSAGE,
                  })}
                />
                {getErrorMessage('zonecode' || 'detailAddress')}
              </div>
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>대표이미지 업로드</RecruitsTitle>
            <div className='flex flex-col gap-1'>
              <div className='flex border-2 border-light-gray-color rounded-xl w-36 h-36 '>
                <GoPlus className='w-10 h-10 m-auto fill-light-gray-color' />
              </div>
              <div className='mt-3 text-size-subbody text-sub-color'>
                권장 크기: 360*360 이상, 정방형으로 사진이 등록됨을 유의하시길
                바랍니다. <br />
                jpg, jpeg, png 형식의 이미지만 등록됩니다.
              </div>
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>해시태그</RecruitsTitle>
            <div className='flex flex-col'>
              {/* <InputsHashTag register={register} setValue={setValue} /> */}
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>신청모집 질문 글</RecruitsTitle>
            <div className='flex flex-col w-1/2'>
              <TextArea
                placeholder='모집에 대한 질문을 작성해주세요. &#13;&#10;(Ex. 개발 경험, MBTI, 싫어하는 스터디원 유형 등)'
                width='w-full'
                height='h-40'
                register={register('recruitQuestion', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              {getErrorMessage('recruitQuestion')}
              <div className='mt-3 text-size-subbody text-sub-color'>
                모임에 가입을 신청한 분에게 궁금한 점을 남겨주세요.
                <br />
                해당 모임 가입 요청 시, 유저가 답변하게 될 질문 글입니다.
                <br />
                모임과 무관하거나 사생활 등 민감한 질문은 피해주시길 바랍니다.
                <br />본 질문은 추후에 수정이 불가하니 신중하게 작성 바랍니다.
              </div>
            </div>
          </div>
        </form>
        <div className='flex justify-center gap-10 m-2'>
          <Button onClick={handleButtonClick} fill='inactiveFill' type='submit'>
            취소
          </Button>
          <Button onClick={handleSubmit(onSubmit)} fill='activeFill'>
            등록
          </Button>
        </div>
      </div>
    </>
  )
}
