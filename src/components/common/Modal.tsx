interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, closeModal, children }: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div
        className='fixed inset-0 opacity-50 bg-dark-gray-color'
        onClick={closeModal}
      ></div>
      <div className='z-50 p-4 bg-white rounded-xl w-fit'>
        <div className='flex justify-end'>
          <button onClick={closeModal}>&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
