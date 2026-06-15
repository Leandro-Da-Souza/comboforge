import { NavLink } from 'react-router'
import '../styles/navigation.css'

export default function Navigation() {
  return (
    <nav className="bottom-nav" aria-label="Primary Navigation">
      <NavLink to="/train">
        <span>Train</span>
      </NavLink>
      <NavLink to="/combos">
        <span>Combos</span>
      </NavLink>
      <NavLink to="/history">
        <span>History</span>
      </NavLink>
      <NavLink to="/settings">
        <span>Settings</span>
      </NavLink>
    </nav>
  )
}
