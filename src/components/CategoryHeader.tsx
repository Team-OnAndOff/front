interface CategoryHeaderProps {
  title: string
  content: string
}

export default function CategoryHeader({
  title,
  content,
}: CategoryHeaderProps) {
  return (
    <header className='flex flex-col items-center w-full gap-8 py-3 bg-sub-color dark:bg-sub-hover-color smooth-color'>
      <span className='font-bold text-white dark:text-dark-light-color text-size-title smooth-color'>
        {title}
      </span>
      <span className='text-white dark:text-dark-light-color smooth-color'>
        {content}
      </span>
    </header>
  )
}
