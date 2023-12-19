interface ChatRoomMessageProps {
  isSelf: boolean
  message: string
}

export default function ChatRoomMessage({
  isSelf,
  message,
}: ChatRoomMessageProps) {
  return (
    <div className='chat-message'>
      <div className={`flex items-end ${isSelf && 'justify-end'}`}>
        <div className='flex flex-col space-y-1 text-xs max-w-xs mx-2 order-2 items-start'>
          <span
            className={`px-4 py-2 rounded-lg inline-block ${
              isSelf
                ? 'bg-main-color text-main-light-color'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {message}
          </span>
        </div>
        <img
          src='https://elice-project-02.s3.ap-northeast-2.amazonaws.com/events/1702812443501-asdf.png'
          alt='profile'
          className={`w-6 h-6 rounded-full cursor-pointer ${
            isSelf ? 'order-2' : 'order-1'
          }`}
        />
      </div>
    </div>
  )
}
