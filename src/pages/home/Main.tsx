import ButtonSample from '@/sample/ButtonSample'
import CardSample from '@/sample/CardSample'
import InputSample from '@/sample/InputSample'
import TagSample from '@/sample/TagSample'
import TextAreaSample from '@/sample/TextArea'
import ModalSample from '@/sample/ModalSample'
import RadioButton from '@/components/sample/RadioButton'
import SearchInputSample from '@/components/sample/SearchInputSample'

export default function Main() {
  return (
    <div className='flex flex-col flex-1'>
      <p>Main</p>
      {/* 버튼 사용 예시입니다. */}
      <ButtonSample />

      {/* 카드 사용 예시입니다. */}
      <CardSample />

      {/* Input 사용 예시입니다. */}
      <InputSample />

      {/* Tag 사용 예시입니다. */}
      <TagSample />

      {/* TextArea 사용 예시입니다. */}
      <TextAreaSample />

      {/* Modal 사용 예시입니다. */}
      <ModalSample />

      {/* 라디오 버튼 사용 예시 */}
      <RadioButton/>

      {/* 서치 인풋 사용 예시 */}
      <SearchInputSample/>
    </div>
  )
}
