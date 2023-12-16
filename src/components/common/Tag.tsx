import { Link } from 'react-router-dom'

interface Tagprops {
  options: { meetup: string; tagName: string }[]
}

export default function Tag({ options }: Tagprops) {
  return (
    <>
      {/* 카테고리는 all로 가도록 설정 (추후에 all에 해당되는 카테고리 id로 바꾸면 됨) */}
      <div className='flex gap-3'>
        {options.map((option, index) => (
          <Link
            to={`/${option.meetup}/0?query=${option.tagName}`}
            key={index}
            className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-subbody text-black-color'
          >{`#${option.tagName}`}</Link>
        ))}
      </div>
    </>
  )
}
