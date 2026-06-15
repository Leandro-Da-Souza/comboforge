import { NavLink } from 'react-router'
import '../styles/navigation.css'

export default function Navigation() {
  return (
    <nav className="bottom-nav" aria-label="Primary Navigation">
      <NavLink to="/train">Train</NavLink>
      <NavLink to="/combos">Combos</NavLink>
      <NavLink to="/history">History</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  )
}
