import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { Category } from '@/types'

interface BreadCrumbProps {
  category?: Category
}

export default function BreadCrumb({ category }: BreadCrumbProps) {
  return (
    <>
      <nav className='w-full rounded-md'>
        <ol className='flex list-reset'>
          <li>
            <Link
              to='/'
              className='transition duration-150 ease-in-out text-primary hover:font-semibold '
            >
              <div className='flex flex-row items-center gap-2 font-light text-black-color break-keep dark:text-dark-light-color smooth-color'>
                <i>
                  <FaHome className='dark:fill-dark-light-color' />
                </i>
                Home
              </div>
            </Link>
          </li>
          <li>
            <span className='mx-2 font-light text-black-color dark:text-dark-light-color smooth-color'>
              /
            </span>
          </li>
          <li>
            <Link
              to={`/meetup-lists/${category?.parentId?.id}`}
              className='font-light transition duration-150 ease-in-out dark:text-dark-light-color smooth-color text-primary hover:font-semibold break-keep'
            >
              {category?.parentId?.name}
            </Link>
          </li>
          <li>
            <span className='mx-2 dark:text-dark-light-color smooth-color text-black-color'>
              /
            </span>
          </li>

          <li className='text-dark-gray-color dark:text-dark-light-color smooth-color'>
            <Link
              to={`/meetup-lists/${category?.parentId?.id}?subCategoryId=${category?.id}`}
              className='transition duration-150 ease-in-out text-primary hover:font-semibold break-keep'
            >
              {category?.name}
            </Link>
          </li>
        </ol>
      </nav>
    </>
  )
}
