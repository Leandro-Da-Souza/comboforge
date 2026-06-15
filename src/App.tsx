import { Navigate, Route, Routes } from 'react-router'
import Train from './components/Train'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/train" replace />} />
      <Route path="/train" element={<Train />} />
      <Route path="/combos" element={<div>Combos</div>} />
      <Route path="/history" element={<div>History</div>} />
      <Route path="/settings" element={<div>Settings</div>} />
    </Routes>
  )
}

export default App
