'use client';

import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { toast } from 'sonner';
import LoadingSpinner from './LoadingSpinner';

export default function Results() {
    const [results, setResults] = useState<{ filename: string; text: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedResults = localStorage.getItem('imageData');
        if (storedResults) {
            const images = JSON.parse(storedResults);
            processImages(images);
        }
    }, []);

    const processImages = (images: { filename: string; base64: string }[]) => {
        const ocrResults: { filename: string; text: string }[] = [];
        images.forEach((image) => {
            Tesseract.recognize(image.base64, 'eng', {
                logger: (m) => console.log(m),
            })
                .then(({ data: { text } }) => {
                    ocrResults.push({ filename: image.filename, text });
                    if (ocrResults.length === images.length) {
                        setResults(ocrResults);
                        setIsLoading(false);
                        localStorage.setItem('ocrResults', JSON.stringify(ocrResults));
                    }
                })
                .catch((error) => {
                    console.error('OCR failed:', error);
                    setIsLoading(false);
                    setResults([{ filename: image.filename, text: 'OCR failed' }]);
                    toast.error('Error processing OCR');
                });
        });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (results.length === 0) {
        return <div>No results found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-4">OCR Results</h1>
            {results.map((result, index) => (
                <div key={index} className="mb-4 p-3 bg-gray-100 rounded shadow">
                    <h2 className="text-lg font-semibold text-black">File: {result.filename}</h2>
                    <p className="mt-2 text-gray-800">{result.text || 'No text extracted'}</p>
                </div>
            ))}
        </div>
    );
}
