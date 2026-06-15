import Train from '../components/Train'
import PageHeader from '../components/PageHeader'
import { appConfig } from '../config/app.config'

export default function TrainPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guest Mode"
        title={appConfig.name}
        description="Wrap Up, Step Up"
      />
      <Train />
    </>
  )
}
