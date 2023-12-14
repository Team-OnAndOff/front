import ButtonSample from '@/sample/ButtonSample'
import CardSample from '@/sample/CardSample'

export default function Main() {
  return (
    <div className='flex flex-col flex-1'>
      <p>Main</p>
      {/* 버튼 사용 예시입니다. */}
      <ButtonSample />

      {/* 카드 사용 예시입니다. */}
      <CardSample />
    </div>
  )
}
