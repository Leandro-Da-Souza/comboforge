import { MoveLeft } from 'lucide-react'
import '../styles/page.css'
import { NavLink, useNavigate } from 'react-router'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  accountLabel?: string
  accountHref?: string
  backHref?: string
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  accountLabel,
  accountHref,
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
              accountHref ? (
                <NavLink to={accountHref}>{accountLabel}</NavLink>
              ) : (
                accountLabel
              )
            ) : null}
          </span>
        </div>
      </section>

      {description ? <p className="page-description">{description}</p> : null}
    </header>
  )
}
