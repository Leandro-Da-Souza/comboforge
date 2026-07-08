import PageHeader from '../components/PageHeader'
import SessionList from '../components/SessionList'
import SessionStats from '../components/SessionStats'
import useSessionHistory from '../hooks/useSessionHistory'

export default function HistoryPage() {
  const { sessionHistory } = useSessionHistory()
  return (
    <>
      <PageHeader
        eyebrow="Training Log"
        title="History"
        description="Review completed training sessions."
      />
      <SessionStats sessions={sessionHistory} />
      <SessionList sessions={sessionHistory} />
    </>
  )
}
