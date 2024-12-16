'use client'

import Link from 'next/link'

export default function CameraButton() {
    return (
        <Link href="/camera">
            <button className="px-6 py-2 bg-accent text-white rounded-full hover:bg-opacity-90 transition-colors">
                Use Camera
            </button>
        </Link>
    )
}

