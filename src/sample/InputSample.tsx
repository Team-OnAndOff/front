import Inputs from '@/components/common/Inputs'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
  inputField: string
}

const InputSample = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Inputs
          placeholder='Placeholder 사용하고 싶은것 사용하기...'
          width='w-1/2'
          register={register('inputField', { required: true })}
        />
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default InputSample
