import {
  useForm,
  SubmitHandler,
  // UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { GoPlus } from 'react-icons/go'
import dayjs from 'dayjs'
import {
  // RadioButtons,
  Button,
  // SelectBox,
  Inputs,
  TextArea,
} from '@/components/common/index'
import RecruitsTitle from '@/components/meeting/recruits/RecruitsTitle'
// import InputsHashTag from '@/components/common/InputsHashTag'

interface FormData {
  meetingRule: number
  selectedCategory: number
  recruitTitle: string
  recruitContent: string
  recruitMembers: number
  zipCode: string
  address: string
  detailAddress: string
  recruitHashTag: string[]
  recruitQuestion: string
}

export default function RecruitsCreate() {
  const { register, handleSubmit, watch } = useForm<FormData>()

  const navigate = useNavigate()
  const currentDate = dayjs().format('YYYY-MM-DD')

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  const handleButtonClick = () => {
    setTimeout(() => {
      navigate(-1)
    }, 200)
  }

  const watchRecruitContentField = watch as UseFormWatch<FormData>
  const watchRecruitContent = () => {
    console.log(watchRecruitContentField('recruitContent', ''))
  }

  // const meetings = [
  //   { text: '오프라인', dataId: 1 },
  //   { text: '온라인', dataId: 2 },
  // ]

  // const options = [
  //   { value: 1, label: '외국어' },
  //   { value: 2, label: '개발' },
  //   { value: 3, label: '운동' },
  //   { value: 4, label: '재테크' },
  //   { value: 5, label: '독서' },
  // ]

  return (
    <>
      <div className='mx-auto w-[1120px] my-20'>
        <div className='flex justify-center mx-auto my-20 font-bold text-size-title'>
          나만의 모임 생성
        </div>
        <form
          className='flex flex-col gap-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex'>
            <RecruitsTitle>만남 유형</RecruitsTitle>
            {/* <RadioButtons
              name='meetings'
              value={meetings}
              register={register('meetingRule', { required: true })}
            /> */}
          </div>
          <div className='flex'>
            <RecruitsTitle>챌린지 기간</RecruitsTitle>
            <div className='flex gap-3'>
              <div className='p-1 px-3 border-2 rounded-md'>{currentDate}</div>
              <p className='pt-2 font-bold'>~</p>
              <div className='p-1 px-3 border-2 rounded-md'>{currentDate}</div>
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>모임 시작일</RecruitsTitle>
            <div className='p-1 px-3 border-2 rounded-md'>{currentDate}</div>
          </div>
          <div className='flex'>
            <RecruitsTitle>세부 카테고리</RecruitsTitle>
            {/* <SelectBox
              bgColor='light-gray-color'
              textSize='size-body'
              options={options}
              register={register('selectedCategory', { required: true })}
            /> */}
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 대상</RecruitsTitle>
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 제목 글</RecruitsTitle>
            <div className='flex flex-col w-1/2'>
              <Inputs
                useMust={true}
                width='w-full'
                register={register('recruitTitle', { required: true })}
              />
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 내용 글</RecruitsTitle>
            <TextArea
              placeholder='모집에 대한 설명을 작성해주세요'
              width='w-1/2'
              height='h-40'
              register={register('recruitContent', { required: true })}
            />
          </div>
          <div className='flex'>
            <RecruitsTitle>모집 할 인원</RecruitsTitle>
            <Inputs
              width='w-1/2'
              register={register('recruitMembers', { required: true })}
            />
          </div>
          <div className='flex'>
            <RecruitsTitle>오프라인 장소</RecruitsTitle>
            <div className='flex flex-col w-1/2'>
              <div className='flex flex-wrap justify-between gap-5'>
                <Inputs
                  placeholder='우편번호'
                  width='w-3/4'
                  register={register('zipCode', { required: true })}
                />
                <Button onClick={handleButtonClick} fill='border' type='submit'>
                  주소 입력
                </Button>
              </div>
              <Inputs
                placeholder='주소'
                width='w-full'
                register={register('address', { required: true })}
              />
              <Inputs
                placeholder='상세주소'
                width='w-full'
                register={register('detailAddress', { required: true })}
              />
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>대표이미지 업로드</RecruitsTitle>
            <div className='flex border-2 border-light-gray-color rounded-xl w-36 h-36 '>
              <GoPlus className='w-10 h-10 m-auto fill-light-gray-color' />
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>해시태그</RecruitsTitle>
            <div className='flex flex-col'>
              {/* <InputsHashTag
                register={register('recruitHashTag', { required: true })}
              /> */}
            </div>
          </div>
          <div className='flex'>
            <RecruitsTitle>신청모집 질문 글</RecruitsTitle>
            <div className='flex flex-col w-1/2'>
              <TextArea
                placeholder='모집에 대한 질문을 작성해주세요. &#13;&#10;(Ex. 개발 경험, MBTI, 싫어하는 스터디원 유형 등)'
                width='w-full'
                height='h-40'
                register={register('recruitContent', { required: true })}
              />
            </div>
          </div>
        </form>

        <div className='flex justify-center gap-10 m-2'>
          <Button onClick={handleButtonClick} fill='inactiveFill' type='submit'>
            취소
          </Button>
          <Button onClick={watchRecruitContent} fill='activeFill' type='submit'>
            등록
          </Button>
        </div>
      </div>
    </>
  )
}
