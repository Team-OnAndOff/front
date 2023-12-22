import { HashTag } from '@/types'
import { Link } from 'react-router-dom'

interface Tagprops {
  options: HashTag[]
  parentId: number
}

export default function Tag({ options, parentId }: Tagprops) {
  return (
    <>
      {/* 카테고리는 all로 가도록 설정 (추후에 all에 해당되는 카테고리 id로 바꾸면 됨) */}
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
