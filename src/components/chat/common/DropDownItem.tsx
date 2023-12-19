interface DropDownItemProps {
  title: string
}

export default function DropDownItem({ title }: DropDownItemProps) {
  return (
    <li>
      <a
        href='#'
        className='block px-4 py-2 hover:bg-main-color hover:text-main-light-color '
      >
        {title}
      </a>
    </li>
  )
}
