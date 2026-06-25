import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import '../../styles/ui/modal.css'
import Button from './Button'

type ModalProps = {
  show: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export default function Modal({
  show,
  onClose,
  children,
  className,
}: ModalProps) {
  return createPortal(
    <section
      className={`modal-wrapper ${show ? 'show' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal ${className ?? ''}`}
      >
        <Button
          variant="primary"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="modal-close"
        >
          <X aria-hidden="true" size={16} />
        </Button>

        {children}
      </div>
    </section>,
    document.body,
  )
}
