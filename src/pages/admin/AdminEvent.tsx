export default function AdminEvent() {
  return (
    <div className='w-full px-3 mx-auto box-border h-full max-h-screen'>
      <div className='flex flex-col break-words border border-dashed rounded-2xl border-stone-200 py-8 pt-6 px-9 text-[0.95rem] text-center overflow-x-scroll'>
        <div className='flex flex-row font-semibold w-full '>
          <div className='p-1.5 text-start w-[5%] min-w-[50px]'>No</div>
          <div className='p-1.5 text-start w-[55%] min-w-[550px]'>모임</div>
          <div className='p-1.5 w-[10%] min-w-[100px]'>등록자</div>
          <div className='p-1.5 w-[10%] min-w-[100px]'>참여인원</div>
          <div className='p-1.5 w-[10%] min-w-[100px]'>생성일시</div>
          <div className='p-1.5 w-[10%] min-w-[100px]'>비고</div>
        </div>
        <div className='lg:overflow-y-scroll  max-h-[calc(100vh-220px)]'>
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className='flex flex-row w-full border-b border-dashed hover:bg-orange-50 cursor-pointer items-center'
            >
              <div className='p-1.5 text-start w-[5%] min-w-[50px]'>
                {index}
              </div>
              <div className='p-1.5 text-start w-[55%] min-w-[550px]'>
                <div className='flex items-center gap-4'>
                  <div className='rounded-2xl'>
                    <img
                      src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg'
                      className='w-[42px] h-[42px] shrink-0 rounded-2xl'
                      alt='image'
                    />
                  </div>
                  <span>Social Media API</span>
                </div>
              </div>
              <div className='p-1.5 w-[10%] min-w-[100px]'>Olivia Cambell</div>
              <div className='p-1.5 w-[10%] min-w-[100px]'>12 명</div>
              <div className='p-1.5 w-[10%] min-w-[100px]'>2024-01-01</div>
              <div className='p-1.5 w-[10%] min-w-[100px]'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
