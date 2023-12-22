import { DropDownItem } from '@/components/chat'

interface DropDownItemsProps {
  isOpen: boolean
}
export default function DropDownItems({ isOpen }: DropDownItemsProps) {
  return (
    <div
      className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-32 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <ul
        className='py-2 text-sm text-gray-700 dark:text-gray-200'
        aria-labelledby='dropdownMenuIconButton'
      >
        <DropDownItem title='신고하기' />
        <DropDownItem title='평가하기' />
      </ul>
    </div>
  )
}
