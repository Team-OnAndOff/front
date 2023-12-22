import { AdminMenu } from '../layouts/AdminLayout'

interface AdminHomeCardProps {
  menu: AdminMenu
}

export default function AdminHomeCard({ menu }: AdminHomeCardProps) {
  return (
    <div className='flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow w-full cursor-pointer hover:bg-orange-50'>
      <menu.icon size={28} />
      <h5 className='mb-1 text-xl font-semibold tracking-tight'>{menu.name}</h5>
      <p className='mb-2 font-normal text-gray-500'>{menu.description}</p>
    </div>
  )
}
