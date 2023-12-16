import {
  useForm,
  SubmitHandler,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form'
import Inputs from '@/components/common/Inputs'

interface Tag {
  id: string
  value: string
}

interface InputsHashTagProps {
  register: UseFormRegister<{ tags: Tag[] }>
}

interface TagForm {
  tags: Tag[]
}

export default function InputsHashTag({ register }: InputsHashTagProps) {
  const { control, handleSubmit, reset } = useForm<TagForm>({
    defaultValues: { tags: [] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const handleTagEnter: SubmitHandler<TagForm> = ({ tags }) => {
    append({ id: Date.now().toString(), value: tags[tags.length - 1].value })
    reset({ tags: [] })
  }

  const handleDeleteTag = (index: number) => {
    remove(index)
  }

  return (
    <form onSubmit={handleSubmit(handleTagEnter)}>
      <Inputs
        placeholder='해시태그를 입력해주세요.'
        width='w-80'
        register={register('tags', { required: true })} // 수정된 부분
        onEnter={() => {}} // onChange에서 실행할 동작이 필요한 경우 여기에 추가
      />
      <div className='my-3 w-fit rounded-xl bg-light-gray-color'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='inline-block p-1 px-3 mx-2 my-3 rounded-md bg-main-light-color w-fit text-subbody text-black-color'
          >
            {`#${field.value}`}
            <div
              className='inline-block ml-2 cursor-pointer text-dark-gray-color'
              onClick={() => handleDeleteTag(index)}
            >
              x
            </div>
          </div>
        ))}
      </div>
    </form>
  )
}
