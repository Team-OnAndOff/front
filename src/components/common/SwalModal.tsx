import React from 'react'
import Swal, { SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface SwalModalProps {
  onClick?: () => void
  children: React.ReactNode
  onConfirm?: () => void
  onDeny?: () => void
  title: React.ReactNode
  content?: React.ReactNode
  showDenyButton?: boolean
  showCancelButton?: boolean
  confirmButtonText?: string
  denyButtonText?: string
  cancelButtonText?: string
  footer?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  timer?: number
  confirmTitle?: '모임등록이 완료되었습니다.' | string
  confirmContent?: string
  confirmIcon?: 'success' | 'info'
  denyTitle?: '모임이 삭제되었습니다.' | '신청이 취소되었습니다' | string
  denyContent?: string
  denyIcon?: 'error' | 'warning' | 'question'
}

export default function SwalModal({
  children,
  title,
  content,
  onConfirm,
  onDeny,
  showDenyButton = true,
  showCancelButton = true,
  confirmButtonText = '확인',
  denyButtonText = '취소',
  cancelButtonText,
  footer,
  icon = 'success',
  timer = 2000,
  confirmTitle,
  confirmContent,
  confirmIcon,
  denyTitle,
  denyContent,
  denyIcon,
}: SwalModalProps) {
  const showSwal = () => {
    MySwal.fire({
      title: title || '',
      html: content || '',
      showDenyButton: showDenyButton,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      denyButtonText: denyButtonText,
      cancelButtonText: cancelButtonText,
      footer: footer,
      icon: icon,
      timer: timer,
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        MySwal.fire(confirmTitle, confirmContent, confirmIcon)
        if (onConfirm) {
          onConfirm()
        }
      } else if (result.isDenied) {
        MySwal.fire(denyTitle, denyContent, denyIcon)
        if (onDeny) {
          onDeny()
        }
      }
    })
  }

  return <div onClick={showSwal}>{children}</div>
}
