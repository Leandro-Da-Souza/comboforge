import Button from './ui/Button'
import { downloadJSON } from '../utils/download'
import { createAppDataExport } from '../utils/exportImport'
import { APP_DATA_EXPORT_IMPORT } from '../config/export.config'
import useSettings from '../hooks/useSettings'
import useCombos from '../hooks/useCombos'
import useSessionHistory from '../hooks/useSessionHistory'

export default function DataTransfer() {
  const { customCombos } = useCombos()
  const { settings } = useSettings()
  const { sessionHistory: history } = useSessionHistory()

  function handleExport() {
    const payload = createAppDataExport(settings, customCombos, history)

    downloadJSON(payload, 'comboforge-export.json')
  }

  return (
    <section className="data-transfer">
      <div className="export">
        <h3>Download Your Workouts</h3>
        <Button variant="primary" onClick={handleExport}>
          Export
        </Button>
      </div>
    </section>
  )
}
