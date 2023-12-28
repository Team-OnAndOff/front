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
    <div className='fixed inset-0 z-50 flex items-center justify-center p-5'>
      <div
        className='absolute inset-0 opacity-50 bg-dark-gray-color'
        onClick={closeModal}
      ></div>
      <div className='z-50 p-5 bg-white desktop:w-[760px] w-[420px] transition-all duration-500 rounded-big-radius'>
        {children}
      </div>
    </div>
  )
}
