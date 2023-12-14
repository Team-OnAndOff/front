import Card from '@/components/common/Card'

export default function CardSample() {
  const cardData = [
    {
      imageUrl:
        'https://media.bunjang.co.kr/product/233471258_1_1692280086_w%7Bres%7D.jpg',
      title:
        '여기는 제목여기는 제목여기는 제목여기는 제목여기는 제목여기는 제목여기는 제목제목여기는제목여기는제목여기는제목여기는',
      startDate: '2023-12-14',
      endDate: '2023-12-31',
    },
    {
      imageUrl: 'https://picsum.photos/360/360',
      title: '여기는 제목',
      startDate: '2023-12-14',
      endDate: '2023-12-31',
    },
    {
      imageUrl: 'https://picsum.photos/360/360',
      title: '여기는 제목',
      startDate: '2023-12-14',
      endDate: '2023-12-31',
    },
  ]

  return (
    <div className='w-[1120px] grid grid-cols-3 gap-4'>
      {cardData.map((card, index) => (
        <Card
          key={index}
          imageUrl={card.imageUrl}
          title={card.title}
          startDate={card.startDate}
          endDate={card.endDate}
          // path={card.url}
        />
      ))}
    </div>
  )
}
