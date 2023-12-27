import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal } from '@/components/common'
import DaumPostcode from 'react-daum-postcode'

interface DaumAddressData {
  zonecode: string
  address: string
  addressType: string
  roadAddress: string
  bname: string
  buildingName: string
}

interface RecruitsAddressProps {
  onComplete: (data: DaumAddressData) => void
  onChange: (address2: string) => void
  address?: {
    zipCode: number
    detail1: string
    detail2: string
    latitude: number
    longitude: number
  }
}

const RecruitsAddress = ({
  onComplete,
  onChange,
  address: initialAddress,
}: RecruitsAddressProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [address, setAddress] = useState(initialAddress)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { setValue, watch } = useForm()

  const complete = (data: DaumAddressData) => {
    let fullAddress = data.address
    let extraAddress = ''
    const zonecode = parseInt(data.zonecode)

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

    setValue('zonecode', zonecode)
    setValue('address', fullAddress)

    onComplete(data)
    closeModal()
  }

  const watchedZoneCode = watch('zonecode', '')
  const watchedAddress = watch('address', '')

  useEffect(() => {
    setAddress(initialAddress)
  }, [initialAddress])
  // TODO: 버그 발견, 오프라인으로 등록하려고 했다가, 온라인으로 바꾸면 주소가 저장되어 있음; onLine으로 저장되면 주소가 삭제되도록 기능을 넣어야 할 것 같음.

  return (
    <>
      <div className='flex gap-3'>
        <input
          placeholder='우편번호'
          className='flex pt-4 pb-1 pl-3 border-b-2 focus:outline-none border-light-gray-color'
          value={address ? `${address.zipCode}` : watchedZoneCode}
          readOnly
        />
        <Button onClick={openModal} fill='border' type='button'>
          주소 입력
        </Button>
      </div>
      <input
        placeholder='주소'
        className='flex w-3/4 pt-4 pb-1 pl-3 border-b-2 focus:outline-none border-light-gray-color'
        value={address ? `${address.detail1}` : watchedAddress}
        readOnly
      />
      <input
        placeholder='상세주소'
        className='flex w-3/4 pt-4 pb-1 pl-3 border-b-2 focus:outline-none border-light-gray-color'
        defaultValue={address ? `${address.detail2}` : ''}
        onChange={(e) => {
          setValue('address2', e.target.value)
          onChange(e.target.value)
        }}
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
