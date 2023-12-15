import { useState } from 'react'
import Inputs from '@/components/common/Inputs'

export default function InputsHashTag() {
  const [tags, setTags] = useState<string[]>([])

  const handleTagEnter = (value: string) => {
    setTags((prevTags) => [...prevTags, value])
  }

  const handleDeleteTag = (index: number) => {
    const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)]
    setTags(newTags)
  }

  return (
    <>
      <Inputs placeholder='hashTag사용하는 input' onEnter={handleTagEnter} />
      <div className='my-3 w-fit rounded-xl bg-light-gray-color'>
        {tags.map((tag, index) => (
          <div
            key={index}
            className='inline-block p-1 px-3 mx-2 my-3 rounded-md bg-main-light-color w-fit text-subbody text-black-color'
          >
            {`#${tag}`}
            <div
              className='inline-block ml-2 cursor-pointer text-dark-gray-color'
              onClick={() => handleDeleteTag(index)}
            >
              x
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
