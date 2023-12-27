import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Swal from 'sweetalert2'
import InputHash from './InputHash'
import { Button } from '@/components/common'
import { userEdit } from '@/api/userEdit'

// 폼 데이터 타입 정의
interface FormData {
  username: string
  introduction: string
  image: File
  hashTags: string[]
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

// 컴포넌트 정의
export default function IntroModal({ closeModal, myUserData, userId }: Props) {
  // useForm 훅을 사용하여 폼 상태 관리
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>()
  const [dataArray, setDataArray] = useState<string[]>([])
  const [myImage, setMyImage] = useState<File | null>(null)
  const formData = getValues()
  // 이미지 변경 핸들러
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setMyImage(selectedFile || null)
    console.log('Selected File:', selectedFile)
  }

  // 폼 서밋 핸들러
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    if (event) {
      event.preventDefault()
    }
    const formData = new FormData()
    formData.append('username', data.username.toString())
    formData.append('introduction', data.introduction.toString())
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
        if (dataArray.length < 10) {
          setDataArray((prevArray) => [...prevArray, value.trim()])
          // hashTags 필드의 값을 setValue를 사용하여 업데이트
          setValue('hashTags', [...dataArray, value.trim()])
        } else {
          alert('태그는 10개까지만 입력할 수 있습니다.')
          console.log(formData)
        }
      } else {
        console.log('이미 존재하는 값입니다.')
      }
    }
  }

  // 해시태그 삭제 로직
  const handleRemoveHash = (index: number) => {
    setDataArray((prevArray) => prevArray.filter((_, i) => i !== index))
    // hashTags 필드의 값을 setValue를 사용하여 업데이트
    setValue(
      'hashTags',
      dataArray.filter((_, i) => i !== index),
    )
  }

  // 탈퇴 버튼 클릭 이벤트
  const quit = () => {
    const 삭제할_ID_값 = '블랙 목티남'
    Swal.fire({
      icon: 'warning',
      title: `[${삭제할_ID_값}] 님`,
      text: `탈퇴 하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: '탈퇴',
      cancelButtonText: '취소',
    }).then((res) => {
      if (res.isConfirmed) {
        console.log('탈퇴 요청 처리')
      } else {
        console.log('취소')
      }
    })
  }

  return (
    <div className='inset-0 flex items-center justify-center'>
      <div className='p-4 bg-white rounded-xl w-fit'>
        <div className='flex items-start justify-between'>
          <p className='font-bold text-size-body'>자기 소개를 수정해주세요.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-40 pt-4 pb-1 pl-3 mb-2 border-b-2 border-light-gray-color focus-within:border-main-color'>
              <input
                className='w-full text-size-body text-black-color focus:outline-none'
                type='text'
                placeholder='닉네임'
                defaultValue={myUserData?.username as string | undefined}
                {...register('username')}
              />
            </div>
            <textarea
              className='resize-none overflow-hidden p-[10px] text-size-body font-medium rounded-button-radius mt-[10px] border-2 border-solid border-main-color '
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
            <div className='flex'>
              <label className='relative flex flex-row items-center cursor-pointer'>
                <input
                  type='file'
                  onChange={(e) => {
                    handleFileChange(e)
                    const file = e.target.files?.[0]
                    register('image', { value: file })
                  }}
                  className='absolute hidden'
                />
                <div className='relative flex items-center justify-center p-6 border-2 border-solid border-main-color rounded-button-radius'>
                  <div className='absolute w-px h-[20px] bg-main-color'></div>
                  <div className='absolute h-px  w-[20px]  bg-main-color'></div>
                </div>
                {!myImage && (
                  <p className='ml-2 text-size-subbody text-main-color'>
                    기준 사이즈 정사각형
                  </p>
                )}
                {myImage && (
                  <div className='flex items-center justify-center ml-2 overflow-hidden rounded-full w-[50px] h-[50px]'>
                    <img
                      src={URL.createObjectURL(myImage)}
                      alt='Selected Image'
                      className='w-auto h-auto max-w-full'
                    />
                  </div>
                )}
              </label>
            </div>
            <InputHash
              placeholder='#태그입력'
              width='w-80'
              onEnter={(value) => handleEnter(value)}
              register={register('hashTags')}
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
                      ⤫
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex items-end justify-between mt-6'>
              <div>
                <button
                  type='button'
                  className='font-black text-main-light-color text-size-body'
                  onClick={quit}
                >
                  탈퇴하기
                </button>
              </div>
              <div>
                <Button
                  children='취소'
                  width='w-[160px] h-[40px] mr-4'
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
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
