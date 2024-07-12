import { lazy, Suspense } from 'react'
import { ProgressBar } from './components/ProgressBar/ProgressBar'

const Router = lazy(() => import("./Router"));

function App() {
  return (
    <div>
      <Suspense fallback={<ProgressBar />}>
        <Router />
      </Suspense>
    </div>
  )
}

export default App
