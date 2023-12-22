// import { useForm, SubmitHandler } from 'react-hook-form'
// import { RadioButtons } from '@/components/common/RadioButtons'

// interface FormValues {
//   meeting: string
// }

// const RadioButtonSample = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>()

//   const meetings = [
//     { text: '오프라인', value: 'offline' },
//     { text: '온라인', value: 'online' },
//   ]

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log('폼 제출:', data)
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <RadioButtons name='meeting' data={meetings} register={register} />
//         {errors.meeting && (
//           <p className='text-red-500'>만남 유형을 선택해주세요.</p>
//         )}
//         <button type='submit'>폼버튼</button>
//       </form>
//     </div>
//   )
// }

// export default RadioButtonSample
