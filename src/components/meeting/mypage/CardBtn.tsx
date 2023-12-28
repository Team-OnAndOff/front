import { Button } from '@/components/common'

interface StateNumber {
  selectedTab: number
}

// 스테이트와 이펙트로 클릭 버튼마다 이벤트를 만들어서 이펙트의 api를 바꿔서 api불러오기?

const onClick = () => {
  alert('신청취소')
}

export const CardBtn = ({ selectedTab }: StateNumber) => {
  return (
    <>
      {selectedTab === 0 && (
        <div className='flex justify-center mt-5'>
          <Button
            children='신청 취소'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={onClick}
          />
        </div>
      )}
      {selectedTab === 1 && (
        <div className='flex justify-center mt-5'>
          <Button
            children='채팅방 입장'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={onClick}
          />
          <Button
            children='모임 나가기'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={onClick}
          />
        </div>
      )}
      {selectedTab === 2 && (
        <div className='flex justify-center mt-5'>
          <Button
            children='모집글 수정'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={onClick}
          />
          <Button
            children='신청자 목록'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={onClick}
          />
        </div>
      )}
      {selectedTab === 3 && (
        <div className='flex justify-center mt-5'>
          <Button
            children='상세보기'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={onClick}
          />
        </div>
      )}
    </>
  )
}
