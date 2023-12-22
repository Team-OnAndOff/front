export default function UserComplaint() {
  return (
    <>
      <div className='flex flex-row font-semibold w-full '>
        <div className='p-1.5 text-start w-[5%] min-w-[50px]'>No</div>
        <div className='p-1.5 text-start w-[30%] min-w-[150px]'>이름</div>
        <div className='p-1.5 text-start w-[45%] min-w-[250px]'>신고내용</div>
        <div className='p-1.5 w-[10%] min-w-[100px]'>신고일시</div>
        <div className='p-1.5 w-[10%] min-w-[100px]'>비고</div>
      </div>
      <div className='lg:overflow-y-scroll  max-h-[calc(100vh-300px)]'>
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className='flex flex-row w-full border-b border-dashed hover:bg-orange-50 cursor-pointer items-center'
          >
            <div className='p-1.5 text-start w-[5%] min-w-[50px]'>{index}</div>
            <div className='p-1.5 text-start w-[30%] min-w-[150px]'>
              <div className='flex items-center gap-4'>
                <div className='rounded-2xl'>
                  <img
                    src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg'
                    className='w-[42px] h-[42px] shrink-0 rounded-2xl'
                    alt='image'
                  />
                </div>
                <span>홍길동</span>
              </div>
            </div>
            <div className='p-1.5 text-start w-[45%] min-w-[250px]'>
              신고내용입니다.
            </div>
            <div className='p-1.5 w-[10%] min-w-[100px]'>2024-01-01</div>
            <div className='p-1.5 w-[10%] min-w-[100px]'></div>
          </div>
        ))}
      </div>
    </>
  )
}
