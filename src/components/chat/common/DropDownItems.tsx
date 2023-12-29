import { DropDownItem } from '@/components/chat'
import { ChatUser } from '@/types'

interface DropDownItemsProps {
  isOpen: boolean
  users: Map<string, ChatUser>
}
export default function DropDownItems({ isOpen, users }: DropDownItemsProps) {
  return (
    <div
      className={`absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 ${
        isOpen ? 'z-50' : 'hidden'
      }`}
    >
      <ul
        className='relative py-2 text-sm text-gray-700 dark:text-gray-200'
        aria-labelledby='dropdownMenuIconButton'
      >
        {Array.from(users.values())?.map((user, index) => (
          <DropDownItem key={index} user={user} />
        ))}
      </ul>
    </div>
  )
}
