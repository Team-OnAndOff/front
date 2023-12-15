import { useState } from 'react'
import Modal from '@/components/common/Modal'

const ModalSample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        모달에 적고 싶은 내용들 여기다가 입력
      </Modal>
    </>
  )
}

export default ModalSample
