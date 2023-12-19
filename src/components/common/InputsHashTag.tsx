import {
  useForm,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form'
import Inputs from '@/components/common/Inputs'

interface Tag {
  id: string
  value: string
}

interface InputsHashTagProps {
  register: UseFormRegister<{ tags: Tag[] }>
  setValue: UseFormSetValue<{ tags: Tag[] }>
}

const useInputsHashTag = ({ register, setValue }: InputsHashTagProps) => {
  const { control } = useForm<{ tags: Tag[] }>({
    defaultValues: { tags: [] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const handleDeleteTag = (index: number) => {
    remove(index)
    setValue(
      'tags',
      fields.map((field) => ({ id: field.id, value: field.value })),
    )
  }

  const handleTagEnter = (value: string) => {
    if (value.trim()) {
      append({ id: Date.now().toString(), value: value.trim() })
      setValue(
        'tags',
        fields.map((field) => ({ id: field.id, value: field.value })),
      )
    }
  }

  return {
    registerTags: register('tags', { required: true }),
    handleTagEnter,
    fields,
    handleDeleteTag,
  }
}

export default function InputsHashTag(props: InputsHashTagProps) {
  const { registerTags, handleTagEnter, fields, handleDeleteTag } =
    useInputsHashTag(props)

  return (
    <div>
      <Inputs
        placeholder='해시태그를 입력해주세요.'
        width='w-80'
        register={registerTags}
        onEnter={handleTagEnter}
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
    </div>
  )
}
