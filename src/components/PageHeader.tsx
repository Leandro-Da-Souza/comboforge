import '../styles/page.css'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <section className="page-title">
        <h1>{title}</h1>
        {eyebrow ? <span className="page-eyebrow">{eyebrow}</span> : null}
      </section>

      {description ? <p className="page-description">{description}</p> : null}
    </header>
  )
}
