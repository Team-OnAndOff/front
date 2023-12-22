interface RecruitsTitleProps {
  children: string
}

export default function RecruitsTitle({ children }: RecruitsTitleProps) {
  return (
    <div className='flex items-start'>
      <span className='w-56 font-bold text-size-title'>{children}</span>
    </div>
  )
}
