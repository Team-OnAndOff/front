import { ChatUser } from '@/types'

interface DropDownItemProps {
  item: ChatUser
}

export default function DropDownItem({ item }: DropDownItemProps) {
  return (
    <li className='px-4 py-2 hover:bg-main-color hover:text-main-light-color cursor-pointer flex items-center gap-2'>
      <img src={item.image} alt='image' className='w-6 h-6 rounded-full' />
      <span className='text-sm font-semibold'>{item.username}</span>
    </li>
  )
}
