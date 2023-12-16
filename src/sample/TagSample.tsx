import Tag from '@/components/common/Tag'

const TagSample = () => {
  const options = [
    { meetup: 'crew', tagName: '태그1' },
    { meetup: 'challenge', tagName: '태그2' },
    { meetup: 'crew', tagName: '태그3' },
  ]
  return (
    <div>
      <Tag options={options} />
    </div>
  )
}

export default TagSample
