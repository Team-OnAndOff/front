import { ChatUser } from '@/types'
import { Link } from 'react-router-dom'

interface DropDownItemProps {
  user: ChatUser
}

export default function DropDownItem({ user }: DropDownItemProps) {
  return (
    <Link to={`/userInfo/${user.userId}`}>
      <li className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-main-color hover:text-main-light-color smooth-color hover:dark:bg-dark-light-color'>
        <img src={user.image} alt='image' className='w-6 h-6 rounded-full' />
        <span className='text-sm font-semibold'>{user.username}</span>
      </li>
    </Link>
  )
}
