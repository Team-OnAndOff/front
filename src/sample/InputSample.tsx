import Inputs from '@/components/common/Inputs'
import InputsHashTag from '@/components/common/InputsHashTag'

const InputSample = () => {
  return (
    <div>
      <Inputs
        placeholder='Placeholder 사용하고 싶은것 사용하기...'
        useMust={true}
      />
      <Inputs
        placeholder='Placeholder 사용하고 싶은것 사용하기...'
        width='w-1/2'
      />
      <InputsHashTag />
    </div>
  )
}

export default InputSample
