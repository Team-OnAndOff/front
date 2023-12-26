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
      <div className='flex gap-3'>
        {options?.map((option, index) => (
          <Link
            to={`/meetup-lists/${parentId}?search=${option.hashtag}`}
            key={index}
            className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-size-subbody text-dark-gray-color'
          >{`#${option.hashtag}`}</Link>
        ))}
      </div>
    </>
  )
}
