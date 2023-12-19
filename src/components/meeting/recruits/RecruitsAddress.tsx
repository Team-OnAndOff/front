import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal } from '@/components/common'
import DaumPostcode from 'react-daum-postcode'

interface DaumAddressData {
  zonecode: string
  address: string
  addressType: string
  bname: string
  buildingName: string
}

interface RecruitsAddressProps {
  onComplete: (data: DaumAddressData) => void
}

const RecruitsAddress = ({ onComplete }: RecruitsAddressProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { setValue, watch } = useForm()

  const complete = (data: DaumAddressData) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    setValue('zonecode', data.zonecode)
    setValue('address', fullAddress)

    onComplete(data)
    closeModal()
  }

  const watchedZoneCode = watch('zonecode', '')
  const watchedAddress = watch('address', '')

  return (
    <>
      <div className='flex gap-3'>
        <input
          placeholder='우편번호'
          className='flex pt-4 pb-1 pl-3 border-b-2 focus:outline-none border-light-gray-color'
          value={watchedZoneCode}
          readOnly
        />
        <Button onClick={openModal} fill='border' type='button'>
          주소 입력
        </Button>
      </div>
      <input
        placeholder='주소'
        className='flex w-full pt-4 pb-1 pl-3 border-b-2 focus:outline-none border-light-gray-color'
        value={watchedAddress}
        readOnly
      />
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className='w-[40rem]'>
          <DaumPostcode
            className='postmodal h-[440px]'
            autoClose
            onComplete={complete}
          />
        </div>
      </Modal>
    </>
  )
}

export default RecruitsAddress
