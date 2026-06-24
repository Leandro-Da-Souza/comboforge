import { Outlet, useLocation } from 'react-router'
import Navigation from './Navigation'
import '../styles/layout.css'

export default function Layout() {
  const location = useLocation()
  const hideNavigation = location.pathname === '/train'

  return (
    <div className="layout">
      <main className="layout-content">
        <Outlet />
      </main>
      {!hideNavigation && <Navigation />}
    </div>
  )
}
