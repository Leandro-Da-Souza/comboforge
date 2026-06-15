import { Outlet } from 'react-router'
import Navigation from './Navigation'
import '../styles/layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <main className="layout-content">
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
}
