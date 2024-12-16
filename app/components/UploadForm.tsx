'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UploadForm() {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setError('Please select files to upload.');
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const imageData = await Promise.all(
                files.map(async (file) => {
                    const base64 = await fileToBase64(file);
                    return { filename: file.name, base64 };
                })
            );

            // Save to localStorage
            localStorage.setItem('imageData', JSON.stringify(imageData));

            setIsLoading(false);
            toast.success('Images uploaded successfully!');
            router.push('/results'); // Redirect to results page
        } catch (err) {
            setIsLoading(false);
            toast.error('Failed to upload images');
        }
    };

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Upload Your Images</h1>
            <input
                type="file"
                multiple
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                onClick={handleUpload}
                disabled={isLoading}
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {isLoading ? 'Uploading...' : 'Upload Files'}
            </button>
        </div>
    );
}
