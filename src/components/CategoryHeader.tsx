interface CategoryHeaderProps {
  title: string
  content: string
  bgColor?: string
  textColor?: string
}

export default function CategoryHeader({
  title,
  content,
  bgColor = 'bg-sub-color',
  textColor = 'text-white',
}: CategoryHeaderProps) {
  return (
    <header
      className={`${bgColor} flex flex-col items-center w-full gap-8 py-3`}
    >
      <span className={`font-bold text-size-title ${textColor}`}>{title}</span>
      <span className='text-white'>{content}</span>
    </header>
  )
}
