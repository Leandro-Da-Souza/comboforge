import { NavLink } from 'react-router'
import '../styles/navigation.css'
import { Zap, ScrollText, History, Settings } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bottom-nav" aria-label="Primary Navigation">
      <NavLink to="/">
        <Zap />
      </NavLink>
      <NavLink to="/combos">
        <ScrollText />
      </NavLink>
      <NavLink to="/history">
        <History />
      </NavLink>
      <NavLink to="/settings">
        <Settings />
      </NavLink>
    </nav>
  )
}
