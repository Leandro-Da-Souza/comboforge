import { MoveLeft } from 'lucide-react'
import '../styles/page.css'
import { useNavigate } from 'react-router'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  accountLabel?: string
  backHref?: string
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  accountLabel,
  backHref,
}: PageHeaderProps) {
  const navigate = useNavigate()

  function handleNavClick(backHref: string = '/') {
    void navigate(backHref)
  }

  return (
    <header className="page-header">
      <section className="page-title">
        <div className="page-title-main">
          <h1>{title}</h1>
          {eyebrow ? <span className="page-eyebrow">{eyebrow}</span> : null}
        </div>
        <div className="page-title-action">
          <span className="account-label">
            {backHref ? (
              <button
                className="page-back-button"
                type="button"
                aria-label="Go Home"
                onClick={() => handleNavClick(backHref)}
              >
                <MoveLeft aria-hidden="true" size={22} />
              </button>
            ) : accountLabel ? (
              accountLabel
            ) : null}
          </span>
        </div>
      </section>

      {description ? <p className="page-description">{description}</p> : null}
    </header>
  )
}
