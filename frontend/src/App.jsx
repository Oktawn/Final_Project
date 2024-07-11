import { lazy, Suspense } from 'react'
import { ProgressBar } from './components/ProgressBar/ProgressBar'

const Router = lazy(() => import("./Router"));

function App() {
  return (
    < >
      <Suspense fallback={<ProgressBar />}>
        <Router />
      </Suspense>
    </>
  )
}

export default App
