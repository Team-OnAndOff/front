import { HashTag } from '@/types'
import { Link } from 'react-router-dom'

interface TagProps {
  options?: HashTag[]
  parentId?: number
  subCategoryId?: number
}

export default function Tag({ options, parentId }: TagProps) {
  return (
    <>
      <div className='flex flex-wrap w-full gap-1 desktop:flex-auto desktop:gap-3 transition-smooth'>
        {options
          ?.sort((a, b) => (a.hashtag > b.hashtag ? -1 : 1))
          .map((option, index) => (
            <Link
              to={`/meetup-lists/${parentId}?search=${option.hashtag}`}
              key={index}
              className='overflow-y-hidden p-1 px-3 my-1 rounded-small-radius bg-main-light-color dark:bg-dark-gray-color w-fit desktop:text-size-subbody text-[0.6.2rem] transition-smooth dark:text-black-color text-dark-gray-color break-keep h-5'
            >{`#${option.hashtag}`}</Link>
          ))}
      </div>
    </>
  )
}
