type ComboPanelProps = {
  currentCombo: string
  upcomingCombo: string
}

export default function ComboPanel({
  currentCombo,
  upcomingCombo,
}: ComboPanelProps) {
  return (
    <section className="combo-panel">
      <p className="combo-label">Current Combo</p>
      <h2>{currentCombo}</h2>
      <p className="upcoming-combo">{upcomingCombo}</p>
    </section>
  )
}
