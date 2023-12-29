interface RecruitsTitleProps {
  children: string
}

export default function RecruitsTitle({ children }: RecruitsTitleProps) {
  return (
    <div className='flex items-start'>
      <span className='w-56 text-lg font-bold desktop:text-size-title tablet:text-lg dark:text-dark-light-color smooth-color'>
        {children}
      </span>
    </div>
  )
}
