interface ChatRoomImageProps {
  onClick: () => void
}

export default function ChatRoomImage({ onClick }: ChatRoomImageProps) {
  return (
    <div onClick={onClick}>
      <img
        src='https://portfolioshop.speedgabia.com/kpyours/sample-SK-LS-28mm-f-4.5.jpg'
        alt='profile'
        className='w-6 h-6 rounded-full cursor-pointer order-1'
      />
    </div>
  )
}
