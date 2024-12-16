'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CameraCapture() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [capturedImages, setCapturedImages] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        startCamera()
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    const startCamera = async () => {
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({ video: true })
            setStream(newStream)
            if (videoRef.current) {
                videoRef.current.srcObject = newStream
            }
        } catch (err) {
            console.error("Error accessing the camera:", err)
        }
    }

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d')
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
                const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
                setCapturedImages(prev => [...prev, imageDataUrl])
            }
        }
    }

    const handleExtract = () => {
        if (capturedImages.length > 0) {
            router.push(`/extract?images=${encodeURIComponent(JSON.stringify(capturedImages))}`)
        }
    }

    return (
        <div className="w-full max-w-md space-y-4">
            <div className="relative w-full aspect-video mb-4">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-lg"
                />
                {!stream && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-lg">
                        Loading camera...
                    </div>
                )}
            </div>
            <div className="flex gap-4">
                <button
                    onClick={captureImage}
                    disabled={!stream}
                    className="flex-1 px-4 py-2 bg-secondary text-white rounded-full hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Capture Image
                </button>
                <button
                    onClick={handleExtract}
                    disabled={capturedImages.length === 0}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Extract Text ({capturedImages.length})
                </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {capturedImages.map((img, index) => (
                    <img key={index} src={img} alt={`Captured ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                ))}
            </div>
            <canvas ref={canvasRef} className="hidden" width={640} height={480} />
        </div>
    )
}

