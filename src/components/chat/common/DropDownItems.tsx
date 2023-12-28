import { DropDownItem } from '@/components/chat'
import { ChatUser } from '@/types'

interface DropDownItemsProps {
  isOpen: boolean
  items: ChatUser[]
}
export default function DropDownItems({ isOpen, items }: DropDownItemsProps) {
  return (
    <div
      className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <ul
        className='py-2 text-sm text-gray-700 dark:text-gray-200'
        aria-labelledby='dropdownMenuIconButton'
      >
        {items?.map((item, index) => <DropDownItem key={index} item={item} />)}
      </ul>
    </div>
  )
}
