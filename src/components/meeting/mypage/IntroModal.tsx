import { useState, useRef, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Logo } from '@/assets/images'
import withReactContent from 'sweetalert2-react-content'
import InputHash from './InputHash'
import { Button } from '@/components/common'
import { userEdit } from '@/api/userEdit'
import { userEsc } from '@/api/userEsx'
import { IoClose } from 'react-icons/io5'
import useAuthStore from '@/store/userStore'
import { fetchLogout } from '@/api/logout'

// 폼 데이터 타입 정의
interface FormData {
  username: string
  introduction: string
  image: File | null
  showImage: string | undefined
  hashtag: string[]
}

// 부모 컴포넌트로 전달되는 프롭스 타입 정의
interface Props {
  closeModal: () => void
  userId?: string
  myUserData?: {
    username?: string | null
    image: {
      uploadPath: string | null
    }
    introduction: string
  } | null
}

const MySwal = withReactContent(Swal)
// 컴포넌트 정의
export default function IntroModal({ closeModal, myUserData, userId }: Props) {
  // useForm 훅을 사용하여 폼 상태 관리
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const [dataArray, setDataArray] = useState<string[]>([])
  const [myImage, setMyImage] = useState<File | null>(null)
  const { setUserLogout } = useAuthStore((state) => state)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onImageDelete = () => {
    setValue('image', null)
    setMyImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  // 이미지 변경 핸들러
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setMyImage(selectedFile || null)
    if (selectedFile) {
      setValue('image', selectedFile)
    }
  }

  // 폼 서밋 핸들러
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    if (event) {
      event.preventDefault()
    }
    const formData = new FormData()
    formData.append('username', data.username.toString())
    formData.append('introduction', data.introduction.toString())
    if (data.hashtag) {
      formData.append('hashtag', data.hashtag.toString())
    }
    // 이미지가 선택된 경우에만 추가
    if (data.image) {
      formData.append('image', data.image)
    }
    try {
      await userEdit(formData, userId)
      rePage()
    } catch {
      console.log('데이터 전달오류')
    }
  }

  const rePage = () => {
    window.location.reload()
  }

  // 해시태그 추가 로직
  const handleEnter = (value: string) => {
    if (value.trim() !== '') {
      if (!dataArray.includes(value.trim())) {
        if (dataArray.length < 3) {
          setDataArray((prevArray) => [...prevArray, value.trim()])
          // hashtag 필드의 값을 setValue를 사용하여 업데이트
          setValue('hashtag', [...dataArray, value.trim()])
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

  // 해시태그 삭제 로직
  const handleRemoveHash = (index: number) => {
    setDataArray((prevArray) => prevArray.filter((_, i) => i !== index))
    // hashtag 필드의 값을 setValue를 사용하여 업데이트
    setValue(
      'hashtag',
      dataArray.filter((_, i) => i !== index),
    )
  }

  // 탈퇴 버튼 클릭 이벤트
  const quit = async () => {
    const 삭제할_ID_값 = `${myUserData?.username}`
    const result = await Swal.fire({
      icon: 'warning',
      title: `${삭제할_ID_값} 님`,
      text: `정말로 탈퇴 하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: '탈퇴',
      cancelButtonText: '취소',
      confirmButtonColor: '#ff5e2e',
      cancelButtonColor: '#3a823f',
    })
    if (result.isConfirmed) {
      const response = await userEsc()
      if (response?.status === 200) {
        MySwal.fire({
          title: '탈퇴 완료',
          html: `
            <img src="${Logo}" alt="Logo" style='margin:auto; width: 50%'/>
            <br/>
            <div>를 이용해주셔서 감사합니다.</div>
          `,
          confirmButtonColor: '#ff5e2e',
        })
        setTimeout(() => {
          setUserLogout()
          fetchLogout()
          window.location.href = '/'
          MySwal.close()
        }, 2000)
      }
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='w-full p-4 bg-white rounded-xl dark:bg-dark-main-color'>
        <div className='flex items-start justify-between'>
          <p className='font-bold text-size-body dark:text-dark-light-color'>
            자기 소개를 수정해주세요.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-40 pt-4 pb-1 pl-3 mb-2 border-b-2 border-light-gray-color focus-within:border-main-color focus-within:dark:border-sub-color smooth-color'>
              <input
                className='w-full text-size-body text-black-color focus:outline-none dark:text-dark-light-color dark:bg-dark-main-color'
                type='text'
                placeholder='닉네임'
                defaultValue={myUserData?.username as string | undefined}
                {...register('username')}
              />
            </div>
            <textarea
              className='p-4 pl-3 border-2 w-full resize-none overflow-hidden text-size-body font-medium rounded-button-radius mt-[10px] border-solid border-light-gray-color focus-within:border-main-color dark:bg-dark-main-color focus:outline-none focus-within:dark:border-sub-color smooth-color'
              {...register('introduction')}
              rows={7}
              cols={80}
              maxLength={200}
              defaultValue={myUserData?.introduction as string | undefined}
              placeholder='자기소개 내용을 입력해주세요. &#xa;(최대 200자)'
            />
            <div className='flex items-start justify-between mt-3 mb-2'>
              <p className='font-bold text-size-body'>프로필 사진 변경</p>
            </div>
            <div className='flex flex-col gap-2 '>
              <div className='flex gap-2'>
                <label className='relative flex flex-row items-center cursor-pointer'>
                  <input
                    ref={(ref) => (fileInputRef.current = ref)}
                    id='picture'
                    className='hidden'
                    type='file'
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={(e) => {
                      handleFileChange(e)
                      const file = e.target.files?.[0]
                      register('image', { value: file })
                    }}
                  />
                  <div className='relative flex items-center justify-center p-6 border-2 border-solid border-main-color dark:border-sub-color rounded-button-radius'>
                    <div className='absolute w-px h-[20px] bg-main-color dark:bg-sub-color'></div>
                    <div className='absolute h-px  w-[20px] bg-main-color dark:bg-sub-color'></div>
                  </div>
                </label>
                {myImage && (
                  <div className='relative'>
                    <div className='relative flex overflow-hidden border-2 cursor-pointer border-light-gray-color rounded-image-radius w-[50px] h-[50px]'>
                      <img
                        className='w-full h-full'
                        src={URL.createObjectURL(myImage)}
                      />
                    </div>
                    <div
                      className='absolute top-[-4px] right-[-4px] z-10 cursor-pointer'
                      onClick={onImageDelete}
                    >
                      <IoClose className='w-4 h-4 bg-white border-2 rounded-full fill-main-color border-main-color dark:fill-sub-color dark:border-sub-color' />
                    </div>
                  </div>
                )}
              </div>
              <p className='ml-2 text-size-subbody text-sub-color'>
                프로필 이미지는 정방형 사이즈로 등록됩니다.
              </p>
              {/* {myImage && (
                  <div className='flex items-center justify-center ml-2 overflow-hidden rounded-full w-[50px] h-[50px]'>
                    <img
                      src={URL.createObjectURL(myImage)}
                      alt='Selected Image'
                      className='w-auto h-auto max-w-full'
                    />
                  </div>
                )} */}
            </div>
            <InputHash
              placeholder='#태그입력'
              width='desktop:w-1/2 w-3/4'
              onEnter={(value) => handleEnter(value)}
              register={register('hashtag')}
            />
            <div>
              <ul className='flex max-w-[550px] w-full flex-wrap gap-3 mt-3'>
                {dataArray.map((item, index) => (
                  <li
                    className='p-1 px-3 my-1 rounded-small-radius bg-main-light-color w-fit text-subbody text-black-color'
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

            <button
              type='button'
              className='font-black font-light text-main-light-color dark:text-dark-gray-color text-size-body relative desktop:top-[3rem] top-[6rem] flex'
              onClick={quit}
            >
              탈퇴하기
            </button>
            <div className='flex flex-col items-center justify-center gap-4 desktop:flex-row'>
              <Button
                children='취소'
                width='w-[160px] h-[40px]'
                fill='border'
                onClick={closeModal}
              />
              <Button
                children='수정'
                width='w-[160px]'
                fill='activeFill'
                onClick={handleSubmit((data, event) => {
                  onSubmit(data, event) //신고
                  closeModal() //닫기
                })}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
