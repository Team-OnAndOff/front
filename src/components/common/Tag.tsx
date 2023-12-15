import { Link } from 'react-router-dom'

export default function Tag() {
  const tags = [
    { tagId: 1, tagName: '해시' },
    { tagId: 2, tagName: '태그' },
    { tagId: 3, tagName: '기타등등' },
  ]

  return (
    <>
      <div className='flex gap-3'>
        {tags.map((tag) => (
          <Link
            to={`/${tag.tagName}`}
            key={tag.tagId}
            className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-subbody text-black-color'
          >{`#${tag.tagName}`}</Link>
        ))}
      </div>
    </>
  )
}
