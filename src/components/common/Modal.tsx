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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 opacity-50 bg-dark-gray-color'
        onClick={closeModal}
      ></div>
      <div className='z-50 p-5 bg-white rounded-xl'>{children}</div>
    </div>
  )
}
