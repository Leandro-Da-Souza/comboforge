import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import '../../styles/ui/modal.css'

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
  if (!show) return null

  return createPortal(
    <section
      className="modal-wrapper"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal ${className ?? ''}`}
      >
        <button type="button" aria-label="Close modal" onClick={onClose}>
          <X aria-hidden="true" size={18} />
        </button>

        {children}
      </div>
    </section>,
    document.body,
  )
}
