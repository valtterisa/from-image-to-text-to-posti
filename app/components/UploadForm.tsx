'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, Trash2, Crop } from 'lucide-react';
import Cropper from 'react-easy-crop';
import Image from 'next/image';
import Separator from './Separator';

interface FileWithPreview {
    file: File | null;
    preview: string;
    base64: string;
}

interface CroppedArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function FileUpload() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const router = useRouter();

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

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
                filename: file?.name || 'captured_image.png',
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

    const handleCamera = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => setCameraStream(stream))
            .catch((err) => {
                toast.error('Unable to access camera.');
                console.error(err);
            });
    };

    const captureImage = () => {
        if (cameraStream) {
            const videoElement = document.querySelector('#video-feed') as HTMLVideoElement;
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL('image/png');
                setImageToCrop(image);
                setCameraStream(null);
                setIsCropping(true);
            }
        }
    };

    const cropImage = async () => {
        if (!imageToCrop || !croppedAreaPixels) return;

        // Create a new image element
        const img = document.createElement('img');
        img.src = imageToCrop;

        await new Promise((resolve) => (img.onload = resolve));

        const canvas = document.createElement('canvas');
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            const croppedImage = canvas.toDataURL('image/png');
            setFiles((prevFiles) => [
                ...prevFiles,
                { file: null, preview: croppedImage, base64: croppedImage },
            ]);
            setImageToCrop(null);
            setIsCropping(false);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
                <div className="flex items-center gap-2 mb-6">
                    <Crop className="w-6 h-6" />
                    <h2 className="text-2xl font-semibold">Lataa tai ota kuva</h2>
                </div>

                {cameraStream ? (
                    <div className="relative">
                        <video
                            id="video-feed"
                            autoPlay
                            playsInline
                            muted
                            ref={(video) => {
                                if (video) {
                                    video.srcObject = cameraStream;
                                }
                            }}
                            className="w-full rounded-lg"
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                            <button
                                onClick={captureImage}
                                className="bg-black text-white py-2 px-4 rounded-lg"
                            >
                                Ota kuva
                            </button>
                            <button
                                onClick={() => setCameraStream(null)}
                                className="bg-white border-2 border-black py-2 px-4 rounded-lg"
                            >
                                Peruuta
                            </button>
                        </div>
                    </div>
                ) : isCropping && imageToCrop ? (
                    <div className="relative w-full h-64">
                        <Cropper
                            image={imageToCrop}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                            <button
                                onClick={cropImage}
                                className="bg-black text-white py-2 px-4 rounded-lg"
                            >
                                Valmis
                            </button>
                            <button
                                onClick={() => {
                                    setImageToCrop(null);
                                    setIsCropping(false);
                                }}
                                className="bg-white border-2 border-black py-2 px-4 rounded-lg"
                            >
                                Peruuta
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            {...getRootProps()}
                            className={`cursor-pointer border-2 border-dashed rounded-lg p-8 ${isDragActive ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
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
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <Image
                                            src={file.preview}
                                            alt={file.file?.name || 'Captured'}
                                            width={64}
                                            height={64}
                                            className="object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => {
                                                setImageToCrop(file.base64);
                                                setIsCropping(true);
                                            }}
                                            className="flex items-center bg-gray-100 text-sm px-4 py-2 rounded-lg"
                                        >
                                            <Crop className="w-4 h-4 mr-2" />
                                            Rajaa

                                        </button>
                                        <button
                                            onClick={() => removeFile(file)}
                                            className="p-2 hover:bg-gray-200 rounded-full"
                                        >
                                            <Trash2 className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="w-full mt-4 bg-black text-white py-3 px-4 rounded-lg"
                                >
                                    Käsittele tiedostot
                                </button>
                            </div>
                        )}

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        <Separator text="tai" />
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleCamera}
                                className="bg-white border-2 border-black text-black py-3 px-6 rounded-lg flex items-center"
                            >
                                <Camera className="w-5 h-5 mr-2" />
                                Käytä kameraa
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
