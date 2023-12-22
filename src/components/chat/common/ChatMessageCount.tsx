interface ChatMessageCountProps {
  count: number
}

export default function ChatMessageCount({ count }: ChatMessageCountProps) {
  const c = count > 999 ? `999+` : count
  return (
    <div className='absolute bottom-2 right-2 bg-main-color inline-block rounded-full px-1.5'>
      <span className='text-main-light-color text-xs'>{c}</span>
    </div>
  )
}
