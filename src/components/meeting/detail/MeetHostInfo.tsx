export default function MeetHostInfo() {
  return (
    <>
      <div className='flex mt-3'>
        {/* 방장 프로필 */}
        <div className='flex flex-col items-center justify-end mr-7'>
          <div className='w-[200px] h-[200px] bg-dark-gray-color rounded-full'>
            프로필 사진
          </div>
          <h5 className='text-size-body'>김민성</h5>
        </div>
        {/* 방장자기소개 */}
        <div className='w-[calc(100%-200px)] bg-dark-gray-color rounded-big-radius'>
          방장 자기소개 자리
        </div>
      </div>
    </>
  )
}
