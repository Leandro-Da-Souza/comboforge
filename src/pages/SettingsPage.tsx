import DataTransfer from '../components/DataTransfer'
import PageHeader from '../components/PageHeader'
import SpeechSettings from '../components/SpeechSettings'
import ThemeSelector from '../components/ThemeSelector'

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Adjust app preferences, theme, and training defaults."
      />
      <ThemeSelector />
      <SpeechSettings />
      <DataTransfer />
    </>
  )
}
