'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, X, ImageIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Separator from './Separator';

interface FileWithPreview {
    file: File;
    preview: string;
    base64: string;
}

export default function FileUpload() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Load files from localStorage on mount
    useEffect(() => {
        const storedFiles = localStorage.getItem('files');
        if (storedFiles) {
            try {
                const parsedFiles = JSON.parse(storedFiles);
                if (Array.isArray(parsedFiles)) {
                    setFiles(
                        parsedFiles.map((item: { name: string; base64: string }) => ({
                            file: new File([], item.name), // Placeholders for reconstructed files
                            preview: '',
                            base64: item.base64,
                        }))
                    );
                }
            } catch (error) {
                console.error('Error parsing files from localStorage', error);
            }
        }
    }, []);

    // Save files to localStorage on update
    useEffect(() => {
        if (files.length > 0) {
            const filesToSave = files.map(({ file, base64 }) => ({
                name: file.name,
                base64,
            }));
            localStorage.setItem('files', JSON.stringify(filesToSave));
        }
    }, [files]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const filePromises = acceptedFiles.map(async (file) => {
            const base64 = await fileToBase64(file);
            return { file, preview: URL.createObjectURL(file), base64 };
        });

        Promise.all(filePromises).then((newFiles) => {
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
    });

    const removeFile = (fileToRemove: FileWithPreview) => {
        setFiles((prevFiles) => prevFiles.filter(({ file }) => file !== fileToRemove.file));
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setError('Please select files to upload.');
            return;
        }
        setError(null);
        setUploading(true);

        try {
            const imageData = files.map(({ file, base64 }) => ({
                filename: file.name,
                base64,
            }));
            localStorage.setItem('imageData', JSON.stringify(imageData));
            setUploading(false);
            setFiles([]);
            toast.success('Images uploaded successfully!');
            router.push('/results');
        } catch (err) {
            setUploading(false);
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

    const handleCamera = () => {
        // Handle camera functionality here
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                    <ImageIcon className="w-6 h-6" />
                    <h2 className="text-2xl font-semibold">Lataa kuvia</h2>
                </div>

                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 transition-colors ${isDragActive
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            Vedä ja pudota tiedostot tähän tai valitse ne napsauttamalla.
                        </p>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mt-6 space-y-4">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="h-16 w-16 relative rounded-md overflow-hidden bg-gray-100">
                                        <img src={file.base64} alt={file.file.name} className="object-cover" />
                                    </div>
                                    <span className="text-sm font-medium">{file.file.name}</span>
                                </div>
                                <button
                                    onClick={() => removeFile(file)}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <Trash2 className="w-5 h-5 text-gray-500" />
                                    <span className="sr-only">Poista tiedosto</span>
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full mt-4 bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Upload className="w-5 h-5" />
                            Käsittele tiedostot
                        </button>
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
                <Separator text='tai' />
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleCamera}
                        className="bg-white border-2 border-black text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <Camera className="w-5 h-5" />
                        Käytä kameraa
                    </button>
                </div>
            </div>
        </div>
    );
}
