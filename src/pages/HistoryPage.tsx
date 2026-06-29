import PageHeader from '../components/PageHeader'
import SessionList from '../components/SessionList'
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
      <SessionList sessions={sessionHistory} />
    </>
  )
}
