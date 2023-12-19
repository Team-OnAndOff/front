interface ChatRoomImageProps {
  onClick: () => void
}

export default function ChatRoomImage({ onClick }: ChatRoomImageProps) {
  return (
    <div onClick={onClick}>
      <img
        src='https://elice-project-02.s3.ap-northeast-2.amazonaws.com/events/1702812443501-asdf.png'
        alt='profile'
        className='w-6 h-6 rounded-full cursor-pointer order-1'
      />
    </div>
  )
}
