import { useState, ChangeEvent } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import InputHash from './InputHash'

export default function IntroModal() {
  const [textareaValue, setTextareaValue] = useState('') // 오리지털 텍스트
  //const [process, setProcess] = useState('') // 줄바꿈 변형 텍스트
  const { register, handleSubmit, setValue, getValues, control } = useForm() //해쉬태그 관련 폼
  const [dataArray, setDataArray] = useState([]) //해쉬태그 관련 스테이트
  const [myImage, setMyImage] = useState<File | null>(null) // 이미지 임시 저장소

  const { fields, append } = useFieldArray({
    control,
    name: 'hashData',
  })

  // 텍스트 영역의 값이 변경될 때 실행되는 이벤트 핸들러
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textToSave = event.target.value.replace(/\n/g, '<br>') // 줄넘김을 위한 데이터 전송용(연결안됨)
    // setProcess(textToSave)
    setTextareaValue(event.target.value)
    console.log(textToSave)
  }

  //이미지 저장용 핸들러
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setMyImage(selectedFile || null)
    console.log('Selected File:', selectedFile)
  }

  //해쉬태그 관련 핸들러
  const onSubmit = (data: { introHash: string }) => {
    const enteredValue = data.introHash.trim()
    if (enteredValue !== '') {
      handleEnter(enteredValue)
    }
    console.log(enteredValue)
  }

  const handleEnter = (value: string | '') => {
    if (value.trim() !== '') {
      setDataArray((prevArray) => [...prevArray, value.trim()])
      console.log(dataArray)
      // useFieldArray를 사용하여 introHash 필드에 값을 추가
      append({ introHash: value.trim() })

      // 확인
      const formData = getValues()
      console.log('Form Data:', formData)
    }
  }

  const addNewField = () => {
    // 새로운 항목의 기본값을 지정하거나 빈 객체를 추가할 수 있습니다.
    append({ introHash: '', id: `${Date.now()}` })
  }

  return (
    <div className='inset-0 flex items-center justify-center'>
      <div className='p-4 bg-white rounded-xl w-fit'>
        <div className='flex items-start justify-between'>
          <p className='font-bold text-size-body'>자기 소개를 수정해주세요.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className='resize-none overflow-hidden p-[10px] text-size-body font-medium rounded-button-radius mt-[10px] border-2 border-solid border-main-color '
              value={textareaValue} // textareaValue 대신 processedText 사용
              onChange={handleTextareaChange}
              rows={7} // 원하는 행 수를 지정할 수 있습니다.
              cols={70} // 원하는 열 수를 지정할 수 있습니다.
              maxLength={200}
              placeholder='자기소개 내용을 입력해주세요. &#xa;(최대 200자)'
            />
            <div className='flex'>
              <label className='relative flex flex-row items-center cursor-pointer'>
                {/* 디자인 커스텀한 input */}
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='absolute hidden'
                />

                {/* 커스텀 디자인을 추가한 버튼 */}
                <div className='relative flex items-center justify-center p-6 border-2 border-solid border-main-color rounded-button-radius'>
                  <div className='absolute w-px bg-black h-[20px] bg-main-color'></div>
                  <div className='absolute h-px bg-black w-[20px]  bg-main-color'></div>
                </div>

                {/* 이미지 미리보기 부분 */}
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
              placeholder='Your Placeholder'
              width='w-80'
              onEnter={(value) => handleEnter(value)}
              register={register('introHash')}
            />
            <button type='submit'>Submit</button>
            <button className='ml-3' type='button' onClick={addNewField}>
              새로운 필드 추가 버튼
            </button>
            <div>
              <ul className='flex max-w-[550px] w-full flex-wrap'>
                {/* 배열에 있는 값들을 리스트로 표시 */}
                {fields.map((item, index) => (
                  <li
                    className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-subbody text-black-color'
                    key={index}
                  >
                    #{item.introHash}
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
