import UploadForm from './components/UploadForm'
import CameraButton from './components/CameraButton'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <UploadForm />
        <div className="flex justify-center">
          <CameraButton />
        </div>
      </div>
    </main>
  )
}

