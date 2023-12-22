interface ChatBadgeProps {
  text: string
  xs?: boolean
}

export default function ChatBadge({ text, xs }: ChatBadgeProps) {
  return (
    <div className='flex w-full justify-center bottom-10'>
      <div className={`bg-sub-color rounded-full ${xs ? 'px-2' : 'px-4'}`}>
        <span className='text-xs text-main-light-color'>{text}</span>
      </div>
    </div>
  )
}
