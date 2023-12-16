// import {
//   RadioButtonsGroup,
//   RadioButtonsOne,
// } from '@/components/common/RadioButtons'

// const RadioButton = () => {
//   // 검색 테스트용 코드 start
//   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     // FormData 객체를 생성하여 form 데이터 추출
//     const formData = new FormData(e.target as HTMLFormElement)

//     // 만남 유형 데이터 확인
//     const selectedMeeting = formData.get('meeting')
//     const test = formData.get('test')

//     // 선택된 만남 유형을 콘솔에 출력
//     console.log('결과:', selectedMeeting, test)
//   }
//   // 테스트용 코드 end

//   // 라디오버튼 테스트용 코드 start
//   const meetings = [
//     { text: '오프라인', dataId: 1 },
//     { text: '온라인', dataId: 2 },
//   ]

//   // const categoryId = [
//   //   {text:"챌린지", dataId:1},
//   // ]
//   // 라디오버튼 테스트용 코드 end

//   return (
//     <div>
//       <form action='submit' onSubmit={handleFormSubmit}>
//         <RadioButtonsGroup title='만남 유형' name='meeting' data={meetings} />
//         {/* 아래는 한개씩 가져다가 쓰는 컴포넌트 위에는 그룹해서 쓰는 컴포넌트  한개씩 쓰는게 편할거같다.*/}
//         <div className='flex'>
//           <RadioButtonsOne name='category' text='챌린지' id='1' />
//           <RadioButtonsOne name='category' text='크루' id='2' />
//         </div>

//         {/* <RadioButtons title="카테고리 설정" name="test" data={categoryId} /> */}
//         <button type='submit'>폼버튼</button>
//       </form>
//     </div>
//   )
// }

// export default RadioButton
