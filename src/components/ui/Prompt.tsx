import Button from './Button'
import Modal from './Modal'
import '../../styles/ui/prompt.css'

type PromptProps = {
  show: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function Prompt({
  show,
  title = '',
  message = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: PromptProps) {
  return (
    <Modal show={show} onClose={onCancel} className="prompt-modal">
      <div className="prompt">
        <div className="prompt-info">
          {title ? <h2>{title}</h2> : null}
          {message ? <p>{message}</p> : null}
        </div>
        <div className="prompt-actions">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
