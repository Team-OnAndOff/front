import { useState, useRef, ChangeEvent } from 'react'
import { fetchPostEvents } from '@/api/event'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { GoPlus } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'
import { CiCalendar } from 'react-icons/ci'
import dayjs from 'dayjs'
import {
  RadioButtons,
  Button,
  SelectBox,
  Inputs,
  TextArea,
} from '@/components/common'
import {
  RecruitsCheckBox,
  RecruitsTitle,
  RecruitsDayPick,
  RecruitsAddress,
  RecruitsCategory,
  RecruitsCareerCategory,
  RecruitsSubCategory1,
  RecruitsSubCategory2,
} from '@/components/meeting'
import InputHash from '@/components/meeting/mypage/InputHash'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface FormData2 {
  categoryId: number
  subCategoryId: number
  careerCategoryId: number[]
  hashTag: string[]
  image: File | null
  title: string
  content: string
  recruitment: number
  question: string
  online: number
  challengeStartDate: Date
  challengeEndDate: Date | null
  address:
    | {
        zipCode: number
        detail1: string
        detail2: string
        latitude: number
        longitude: number
      }
    | string
}

const MySwal = withReactContent(Swal)

export default function RecruitsCreate() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData2>({
    defaultValues: {
      hashTag: [],
      challengeStartDate: new Date(),
      categoryId: 1,
      online: 1,
    },
  })
  const navigate = useNavigate()
  const [flag, setFlag] = useState(0)
  const [showStartDayPick, setShowStartDayPick] = useState(false)
  const [showEndDayPick, setShowEndDayPick] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1)
  const [selectedOnLine, setSelectedOnLine] = useState<number | null>(1)
  const [myImage, setMyImage] = useState<File | null>(null)
  const [dataArray, setDataArray] = useState<string[]>([])
  const currentStartDate = dayjs(watch('challengeStartDate')).format(
    'YYYY-MM-DD',
  )
  const [currentEndDate, setCurrentEndDate] = useState<string>(
    dayjs(watch('challengeEndDate')).format('YYYY-MM-DD'),
  )

  const onSubmit: SubmitHandler<FormData2> = async (data, event) => {
    if (event) {
      event.preventDefault()
    }

    if (watch('address') && !watch('address.detail2')) {
      const detail2Locate = document.querySelector('.detail2Locate')
      if (detail2Locate) {
        detail2Locate.scrollIntoView({
          behavior: 'smooth',
        })
      }
      return
    }
    const formData = new FormData()
    formData.append('categoryId', data.categoryId.toString())
    formData.append('subCategoryId', data.subCategoryId.toString())
    formData.append('careerCategoryId', data.careerCategoryId.toString())
    formData.append('hashTag', data.hashTag.toString())
    if (data.image) {
      formData.append('image', data.image)
    }
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('recruitment', data.recruitment.toString())
    formData.append('question', data.question)
    formData.append('online', data.online.toString())
    formData.append('challengeStartDate', data.challengeStartDate.toISOString())
    if (data.challengeEndDate) {
      formData.append('challengeEndDate', data.challengeEndDate.toISOString())
    } else {
      formData.append('challengeEndDate', '')
    }
    if (data.address) {
      formData.append('address', JSON.stringify(data.address))
    } else {
      formData.append('address', '')
    }

    try {
      const result = await MySwal.fire({
        title: '등록 확인',
        text: '작성하신 내용을 등록하시겠습니까?',
        icon: 'question',
        iconColor: '#ff5e2e',
        footer: `부적절한 내용이 담겨있을 경우, <br/> 관리자에 의해 게시물이 차단되거나 타유저에게 신고 당할 수 있습니다.`,
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
        confirmButtonColor: '#ff5e2e',
        cancelButtonColor: '#3a823f',
      })
      if (result.isConfirmed) {
        await fetchPostEvents(formData)
        MySwal.fire({
          title: '등록 성공',
          text: '모임등록이 완료되었습니다.',
          icon: 'success',
          confirmButtonColor: '#ff5e2e',
        })
        setTimeout(() => {
          if (watch('categoryId') === 1) {
            navigate('/meetup-lists/1')
          } else if (watch('categoryId') === 2) {
            navigate('/meetup-lists/2')
          }
          MySwal.close()
        }, 2000)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleButtonClick = () => {
    navigate(-1)
  }

  const REQUIRED_MESSAGE = '*필수로 입력해주세요.'

  const getErrorMessage = <T extends keyof FormData2>(field: T) => {
    return errors[field] ? (
      <p className='block mt-2 text-red-500 text-size-subbody dark:text-main-hover-color transition-smooth'>
        {errors[field]?.message}
      </p>
    ) : null
  }

  const handleDateChange = (date: Date) => {
    setValue('challengeStartDate', date)
    setShowStartDayPick(false)
    setValue('challengeEndDate', date)
    setCurrentEndDate(dayjs(date).format('YYYY-MM-DD'))
  }

  const handleEndDateChange = (date: Date) => {
    setValue('challengeEndDate', date)
    setCurrentEndDate(dayjs(date).format('YYYY-MM-DD'))
    setShowEndDayPick(false)
  }

  const handleStartDayPickClick = () => {
    setShowStartDayPick(!showStartDayPick)
    setShowEndDayPick(false)
  }

  const handleEndDayPickClick = () => {
    setShowEndDayPick(!showEndDayPick)
    setShowStartDayPick(false)
  }

  const handleCategoryChange = (value: number) => {
    setSelectedCategory(value)
    setValue('challengeStartDate', new Date())
    setCurrentEndDate(dayjs(new Date()).format('YYYY-MM-DD'))
    setValue('categoryId', value)
  }

  const handleOnLineChange = (value: number) => {
    setSelectedOnLine(value)
    setValue('online', value)

    if (value === 1) {
      setValue('address', '')
    }
  }

  const handleValueClick = (value: number) => {
    setValue('subCategoryId', value)
  }

  const handleAddress = (data: {
    zonecode: string
    address: string
    roadAddress: string
  }) => {
    setValue('address.zipCode', Number(data.zonecode))
    setValue('address.detail1', data.address)

    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.addressSearch(data.roadAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setValue('address.latitude', Number(result[0].y))
        setValue('address.longitude', Number(result[0].y))
      }
    })
  }

  const handleAddress2 = (address2: string) => {
    setValue('address.detail2', address2)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setMyImage(selectedFile || null)
    if (selectedFile) {
      setValue('image', selectedFile)
    }
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const onImageDelete = () => {
    setValue('image', null)
    setMyImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleEnter = (value: string) => {
    if (value.trim() !== '') {
      if (!dataArray.includes(value.trim())) {
        if (dataArray.length < 3) {
          setDataArray((prevArray) => [...prevArray, value.trim()])
          setValue('hashTag', [...dataArray, value.trim()])
        } else {
          MySwal.fire({
            title: '태그는 3개까지만 입력할 수 있습니다.',
            icon: 'error',
            confirmButtonColor: '#ff5e2e',
          })
        }
      } else {
        MySwal.fire({
          title: '이미 존재하는 값입니다.',
          text: '다른 해시태그를 입력해주세요.',
          icon: 'warning',
          iconColor: '#ff5e2e',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
  }

  const handleRemoveHash = (index: number) => {
    setDataArray((prevArray) => prevArray.filter((_, i) => i !== index))
    setValue(
      'hashTag',
      dataArray.filter((_, i) => i !== index),
    )
  }

  const category = RecruitsCategory()
  const careerCategoryId = RecruitsCareerCategory()
  const subCategoryId1 = RecruitsSubCategory1()
  const subCategoryId2 = RecruitsSubCategory2()

  const online = [
    { text: '온라인', value: 1 },
    { text: '오프라인', value: 0 },
  ]

  return (
    <>
      <div className='w-3/4 mx-auto my-20 desktop:w-full'>
        <div className='flex justify-center mx-auto font-bold text-size-title dark:text-dark-light-color transition-smooth'>
          나만의 모임 생성
        </div>
        <form className='flex flex-col gap-16 my-20'>
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row transition-smooth'>
            <RecruitsTitle>카테고리 설정</RecruitsTitle>
            <div className='flex flex-col cursor-pointer'>
              <RadioButtons
                data={category}
                name='category'
                clickChange={handleCategoryChange}
                selectedValue={selectedCategory}
              />
            </div>
          </div>
          {selectedCategory === 2 && (
            <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row transition-smooth'>
              <RecruitsTitle>챌린지 기간</RecruitsTitle>
              <div className='flex gap-3'>
                <div>
                  <div
                    className='flex p-2.5 px-3 border-2 border-black-color dark:border-dark-light-color rounded-small-radius cursor-pointer dark:text-dark-light-color transition-smooth text-black-color items-center gap-x-1 text-size-subbody'
                    onClick={handleStartDayPickClick}
                  >
                    <CiCalendar className='fill-black-color dark:fill-dark-light-color transition-smooth' />
                    {currentStartDate}
                  </div>
                  {showStartDayPick && (
                    <RecruitsDayPick
                      onDayClick={handleDateChange}
                      selectedStartDate={watch('challengeStartDate')}
                    />
                  )}
                </div>
                <p className='pt-2 font-bold text-black-color dark:text-dark-light-color'>
                  ~
                </p>
                <div>
                  <div
                    className='flex p-2.5 px-3 border-2 border-black-color dark:border-dark-light-color rounded-small-radius cursor-pointer dark:text-dark-light-color transition-smooth text-black-color items-center gap-x-1 text-size-subbody'
                    onClick={handleEndDayPickClick}
                  >
                    <CiCalendar className='fill-black-color dark:fill-dark-light-color transition-smooth' />
                    {currentEndDate}
                  </div>
                  {showEndDayPick && (
                    <RecruitsDayPick
                      onDayClick={handleEndDateChange}
                      selectedStartDate={watch('challengeStartDate')}
                      selectedEndDate={watch('challengeEndDate')}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedCategory !== 2 && (
            <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
              <RecruitsTitle>모임 시작일</RecruitsTitle>
              <div>
                <div
                  className='flex items-center gap-1 p-2.5 px-3 border-2 rounded-small-radius cursor-pointer w-fit dark:text-dark-light-color transition-smooth'
                  onClick={handleStartDayPickClick}
                >
                  <CiCalendar className='fill-black-color dark:fill-dark-light-color transition-smooth' />
                  {currentStartDate}
                </div>
                {showStartDayPick && (
                  <RecruitsDayPick
                    onDayClick={handleDateChange}
                    selectedStartDate={watch('challengeStartDate')}
                  />
                )}
              </div>
            </div>
          )}
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
            <RecruitsTitle>세부 카테고리</RecruitsTitle>
            <div className='flex flex-col'>
              {selectedCategory !== 2 && (
                <SelectBox
                  bgColor='white'
                  textSize='size-body'
                  options={subCategoryId1}
                  register={register('subCategoryId', {
                    required: REQUIRED_MESSAGE,
                  })}
                  onClick={handleValueClick}
                />
              )}
              {selectedCategory === 2 && (
                <SelectBox
                  bgColor='white'
                  textSize='size-body'
                  options={subCategoryId2}
                  register={register('subCategoryId', {
                    required: REQUIRED_MESSAGE,
                  })}
                  onClick={handleValueClick}
                />
              )}
              {flag === 1 && !watch('subCategoryId') && (
                <p className='block mt-2 text-red-500 dark:text-main-hover-color text-size-subbody transition-smooth'>
                  *필수로 선택해주세요.
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row transition-smooth'>
            <RecruitsTitle>모집 대상</RecruitsTitle>
            <div className='flex flex-col'>
              <RecruitsCheckBox
                options={careerCategoryId}
                name='careerCategoryId'
                onChange={(selectedValues) => {
                  setValue('careerCategoryId', selectedValues)
                }}
              />
              {flag === 1 &&
                (!watch('careerCategoryId') ||
                  watch('careerCategoryId').length === 0) && (
                  <p className='block mt-2 text-red-500 dark:text-main-hover-color text-size-subbody transition-smooth'>
                    *필수로 선택해주세요.
                  </p>
                )}
            </div>
          </div>
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
            <RecruitsTitle>모집 제목 글</RecruitsTitle>
            <div className='flex flex-col w-3/4 desktop:w-1/2'>
              <Inputs
                width='w-full desktop:w-3/4'
                register={register('title', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              {getErrorMessage('title')}
            </div>
          </div>
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row transition-smooth'>
            <RecruitsTitle>모집 내용 글</RecruitsTitle>
            <div className='flex flex-col transition-smooth desktop:w-1/2'>
              <TextArea
                placeholder='모집에 대한 설명을 작성해주세요'
                width='w-full'
                height='h-40'
                register={register('content', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              {getErrorMessage('content')}
            </div>
          </div>
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
            <RecruitsTitle>모집 할 인원</RecruitsTitle>
            <div className='flex flex-col'>
              <div className='flex items-end gap-3'>
                <Inputs
                  width='w-12'
                  type='number'
                  minValue={2}
                  register={register('recruitment', {
                    valueAsNumber: true,
                    required: '*숫자만 입력해주세요.',
                  })}
                />
                <p className='mb-1 text-text-subbody text-dark-gray-color'>
                  명
                </p>
              </div>
              {getErrorMessage('recruitment')}
            </div>
          </div>
          <div className='flex flex-col gap-4 detail2Locate desktop:gap-0 desktop:flex-row'>
            <RecruitsTitle>만남 유형</RecruitsTitle>
            <div>
              <RadioButtons
                data={online}
                name='online'
                clickChange={handleOnLineChange}
                selectedValue={selectedOnLine}
              />
              {getErrorMessage('online')}
            </div>
          </div>
          {selectedOnLine !== 1 && (
            <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
              <RecruitsTitle>오프라인 장소</RecruitsTitle>
              <div className='flex flex-col w-1/2'>
                <div className='flex flex-wrap justify-between gap-5'>
                  <RecruitsAddress
                    onComplete={handleAddress}
                    onChange={handleAddress2}
                  />
                  {flag === 1 && watch('online') === 0 && !watch('address') && (
                    <p className='block mt-2 text-red-500 text-size-subbody dark:text-main-hover-color transition-smooth'>
                      *오프라인 선택시 주소는 필수로 입력해주세요.
                    </p>
                  )}
                  {flag === 1 &&
                    watch('online') === 0 &&
                    watch('address.detail1') &&
                    !watch('address.detail2') && (
                      <p className='block mt-2 text-red-500 dark:text-main-hover-color text-size-subbody transition-smooth'>
                        *상세 주소는 필수로 입력해주세요.
                      </p>
                    )}
                </div>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
            <RecruitsTitle>대표이미지 업로드</RecruitsTitle>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3'>
                <input
                  ref={(ref) => (fileInputRef.current = ref)}
                  id='picture'
                  type='file'
                  className='hidden dark:border-dark-light-color transition-smooth'
                  accept='image/png, image/jpeg, image/jpg'
                  onChange={(e) => {
                    handleFileChange(e)
                    const file = e.target.files?.[0]
                    register('image', {
                      value: file,
                      required: REQUIRED_MESSAGE,
                    })
                  }}
                />
                <div
                  className='flex border-2 cursor-pointer border-light-gray-color rounded-image-radius w-36 h-36'
                  onClick={() => {
                    if (watch('image')) {
                      MySwal.fire({
                        title: '사진은 한 장만 등록됩니다.',
                        icon: 'error',
                        confirmButtonColor: '#ff5e2e',
                      })
                    } else {
                      document.getElementById('picture')?.click()
                    }
                  }}
                >
                  <GoPlus className='w-10 h-10 m-auto fill-light-gray-color' />
                </div>
                {myImage ? (
                  <div className='relative'>
                    <div className='relative flex overflow-hidden border-2 cursor-pointer border-light-gray-color rounded-image-radius w-36 h-36'>
                      <img
                        className='w-full h-full'
                        src={URL.createObjectURL(myImage)}
                      />
                    </div>
                    <div
                      className='absolute top-[-7px] right-[-7px] z-10 cursor-pointer'
                      onClick={onImageDelete}
                    >
                      <IoClose className='w-6 h-6 bg-white border-2 rounded-full fill-main-color dark:fill-dark-gray-color dark:border-dark-gray-color transition-smooth border-main-color' />
                    </div>
                  </div>
                ) : null}
              </div>
              {flag === 1 && !watch('image') && (
                <p className='block mt-2 text-red-500 dark:text-main-hover-color transition-smooth text-size-subbody'>
                  *이미지는 필수로 등록해주세요.
                </p>
              )}
              <div className='mt-3 text-size-subbody text-sub-color'>
                사진은 한 장 만 등록됩니다. <br />
                권장 크기: 360*360 이상, 정방형으로 사진이 등록됨을 유의하시길
                바랍니다. <br />
                jpg, jpeg, png 형식의 이미지만 등록 가능합니다.
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
            <RecruitsTitle>해시태그</RecruitsTitle>
            <div className='flex flex-col w-3/4 desktop:w-1/2'>
              <InputHash
                placeholder='#태그입력'
                width='w-full desktop:w-3/4'
                onEnter={(value) => handleEnter(value)}
                register={register('hashTag', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              <div className='mt-3 text-size-subbody text-sub-color'>
                해시태그는 최대 3개까지 입력 가능합니다.
              </div>
              {flag === 1 && watch('hashTag').length === 0 && (
                <p className='block mt-2 text-red-500 text-size-subbody transition-smooth dark:text-main-hover-color'>
                  *해시태그는 필수로 등록해주세요.
                </p>
              )}
              <div>
                <ul className='flex max-w-[550px] w-full flex-wrap gap-3 mt-3'>
                  {dataArray.map((item, index) => (
                    <li
                      className='p-1 px-3 my-1 rounded-small-radius bg-main-light-color dark:bg-dark-light-color w-fit text-subbody text-black-color transition-smooth'
                      key={index}
                    >
                      #{item}
                      <span
                        onClick={() => handleRemoveHash(index)}
                        className='cursor-pointer'
                      >
                        &nbsp; &#215;
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 desktop:gap-0 desktop:flex-row'>
            <RecruitsTitle>신청모집 질문 글</RecruitsTitle>
            <div className='flex flex-col desktop:w-1/2'>
              <TextArea
                placeholder='모집에 대한 질문을 작성해주세요. &#13;&#10;(Ex. 개발 경험, MBTI, 싫어하는 스터디원 유형 등)'
                width='w-full'
                height='h-40'
                register={register('question', {
                  required: REQUIRED_MESSAGE,
                })}
              />
              {getErrorMessage('question')}
              <div className='mt-3 text-size-subbody text-sub-color'>
                모임에 가입을 신청한 분에게 궁금한 점을 남겨주세요.
                <br />
                해당 모임 가입 요청 시, 유저가 답변하게 될 질문 글입니다.
                <br />
                모임과 무관하거나 사생활 등 민감한 질문은 피해주시길 바랍니다.
                <br />
                취지에 어긋나는 모임의 경우 작성자의 허락없이 관리자에 의해
                모임이 임의 삭제될 수 있습니다.
              </div>
            </div>
          </div>
        </form>
        <div className='flex justify-center gap-10 m-2'>
          <Button onClick={handleButtonClick} fill='inactiveFill' type='submit'>
            취소
          </Button>
          <Button
            onClick={() => {
              handleSubmit(onSubmit)()
              setFlag(1)
            }}
            fill='activeFill'
          >
            등록
          </Button>
        </div>
      </div>
    </>
  )
}
