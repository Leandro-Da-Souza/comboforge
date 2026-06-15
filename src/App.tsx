import { Navigate, Route, Routes } from 'react-router'
import TrainPage from './pages/TrainPage'
import CombosPage from './pages/CombosPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/train" replace />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/combos" element={<CombosPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
