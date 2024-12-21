import { Suspense } from 'react'
import Results from '../components/Results'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ExtractPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Suspense fallback={<LoadingSpinner />}>
                {/* <Suspense> */}
                <Results />
            </Suspense>
        </main>
    )
}

