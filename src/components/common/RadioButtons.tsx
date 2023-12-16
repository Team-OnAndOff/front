interface RadioButtonProps {
  title: string
  data: { text: string; dataId: string | number }[]
  name: string
}

interface RadioButtonPropsOne {
  name: string
  text: string
  id: number | string
}

export function RadioButtonsGroup({ title, data, name }: RadioButtonProps) {
  return (
    <div className='flex items-center'>
      <span className='w-48 text-2xl font-bold'>{title}</span>
      <div className='flex'>
        {data.map((data) => (
          <label key={data.text} className='flex items-center w-32'>
            <input
              className='w-4 h-4 mb-1 ml-2 text-orange-600 bg-orange-500 border-orange-300 accent-main-color focus:ring-0 focus:border-orange-500 dark:focus:border-orange-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
              type='radio'
              value={data.dataId}
              name={name}
              required
            />
            <span className='text-size-body mb-0.5 ml-2 font-bold'>
              {data.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function RadioButtonsOne({ name, text, id }: RadioButtonPropsOne) {
  return (
    <div className='flex'>
      <label key={text} className='flex items-center w-32'>
        <input
          className='w-4 h-4 mb-1 ml-2 text-orange-600 bg-orange-500 border-orange-300 accent-main-color focus:ring-0 focus:border-orange-500 dark:focus:border-orange-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
          type='radio'
          value={id}
          name={name}
          required
        />
        <span className='text-size-body mb-0.5 ml-2 font-bold'>{text}</span>
      </label>
    </div>
  )
}

//그룹
{
  /* <div className='flex'>
{data.map((data) =>(
  <label key={data.text} className='flex items-center w-32'> 
      <input
        className='w-4 h-4 mb-1 ml-2 text-orange-600 bg-orange-500 border-orange-300 accent-main-color focus:ring-0 focus:border-orange-500 dark:focus:border-orange-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
        type="radio"
        value={data.dataId}
        name={name}
        required
      />
    <span className='text-size-body mb-0.5 ml-2 font-bold'>{data.text}</span>
  </label>
))}
</div> */
}
