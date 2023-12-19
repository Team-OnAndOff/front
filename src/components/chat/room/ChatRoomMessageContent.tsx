interface ChatMessageProps {
  isSelf: boolean
  message: string
}

export default function ChatMessage({ isSelf, message }: ChatMessageProps) {
  return (
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
  )
}
