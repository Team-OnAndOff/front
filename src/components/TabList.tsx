import { Category } from '@/types'

interface TabProps {
  id: number
  label: string
  onClick: (categoryId: number) => void
  isSelected?: boolean
}

const Tab = ({ id, label, onClick, isSelected }: TabProps) => {
  const tabStyles = `flex-1 items-center px-1 py-4 text-sm border-b-2 gap-x-2 whitespace-nowrap focus:outline-none ${
    isSelected
      ? 'font-semibold border-main-color text-main-color'
      : 'hover:text-gray-500 border-transparent text-dark-gray-color'
  }`
  return (
    <button type='button' className={tabStyles} onClick={() => onClick(id)}>
      {label}
    </button>
  )
}

interface TabListProps {
  categories: Category[]
  handleTabClick: (categoryId: number) => void
  selectedCategoryId?: number
}

export default function TabList({
  categories,
  handleTabClick,
  selectedCategoryId,
}: TabListProps) {
  return (
    <div className='border-b border-light-gray-color'>
      <nav
        className='flex justify-around pt-8'
        aria-label='Tabs'
        role='tablist'
      >
        {categories.map(({ id, name }) => (
          <Tab
            key={id}
            id={id}
            label={name}
            onClick={() => handleTabClick(id)}
            isSelected={selectedCategoryId === id}
          />
        ))}
      </nav>
    </div>
  )
}
