'use client';

import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { toast } from 'sonner';
import {
    User,
    MapPin,
    Phone,
    Mail,
    Building,
    Globe,
    Check,
    AlertCircle,
    Edit2
} from 'lucide-react';

import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';

export default function Results() {
    const [results, setResults] = useState<{ filename: string; text: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [extractedData, setExtractedData] = useState<any[]>([]);
    const [confirmedForms, setConfirmedForms] = useState<boolean[]>([]);

    useEffect(() => {
        const storedResults = localStorage.getItem('imageData');
        if (storedResults) {
            const images = JSON.parse(storedResults);
            processImages(images);
        }
    }, []);

    const processImages = (images: { filename: string; base64: string }[]) => {
        const ocrResults: { filename: string; text: string }[] = [];
        const ocrPromises = images.map((image) =>
            Tesseract.recognize(image.base64, 'eng')
                .then(({ data: { text } }) => {
                    ocrResults.push({ filename: image.filename, text });
                })
                .catch((error) => {
                    console.error('OCR failed:', error);
                    toast.error('Error processing OCR');
                    ocrResults.push({ filename: image.filename, text: 'OCR failed' });
                })
        );

        Promise.all(ocrPromises).then(() => {
            setResults(ocrResults);
            extractDataFromText(ocrResults);
        });
    };

    const extractDataFromText = async (ocrResults: { filename: string; text: string }[]) => {
        try {
            const dataPromises = ocrResults.map(async (result) => {
                const response = await fetch('api/openai', {
                    method: 'POST',
                    body: JSON.stringify(result),
                });
                const data = await response.json();
                return data;
            });

            const extracted = await Promise.all(dataPromises);
            setExtractedData(extracted);
            setConfirmedForms(Array(extracted.length).fill(false));
        } catch (error) {
            console.error('Error extracting data:', error);
            toast.error('Error extracting structured data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedData = [...extractedData];
        updatedData[index][field] = value;
        setExtractedData(updatedData);
    };

    const validateForm = (index: number): boolean => {
        const data = extractedData[index] || {};
        return Object.values(data).every((value) => value && value.trim() !== '');
    };

    const handleConfirmForm = (index: number) => {
        if (validateForm(index)) {
            const updatedConfirmedForms = [...confirmedForms];
            updatedConfirmedForms[index] = true;
            setConfirmedForms(updatedConfirmedForms);
            toast.success('Form confirmed successfully!');
        } else {
            toast.error('Please fill all fields before confirming the form.');
        }
    };

    const handleSubmit = () => {
        extractedData.forEach(async (item, index) => {
            try {
                const response = await fetch('/api/sendData', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item),
                });

                if (response.ok) {
                    toast.success(`${results[index].filename} data submitted successfully!`);
                } else {
                    throw new Error(`Error submitting ${results[index].filename} data.`);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
                toast.error(`Error submitting ${results[index].filename} data.`);
            }
        });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-screen-lg w-full mx-auto p-4 text-black">
            <h2 className="font-bold text-2xl mb-4">Results</h2>
            {results.map((result, index) => (
                <div
                    key={index}
                    className={`mb-6 p-4 rounded-lg shadow-md transition-all duration-300 ${confirmedForms[index]
                        ? 'bg-green-50 border-2 border-green-500'
                        : validateForm(index)
                            ? 'bg-white border border-gray-300'
                            : 'bg-red-50 border-2 border-red-500'
                        }`}
                >
                    {!confirmedForms[index] ? (
                        <>
                            <h3 className="text-lg font-semibold text-black">{result.filename}</h3>
                            <div className="mt-4 space-y-4">
                                {Object.entries(extractedData[index] || {}).map(([key, value]) => (
                                    <div key={key} className="relative">
                                        <div className="absolute left-3 top-3 text-gray-600">
                                            {key === 'name' && <User size={20} />}
                                            {key === 'address1' && <MapPin size={20} />}
                                            {key === 'mobile' && <Phone size={20} />}
                                            {key === 'email' && <Mail size={20} />}
                                            {key === 'zipcode' && <Mail size={20} />}
                                            {key === 'country' && <Globe size={20} />}
                                            {key === "city" && <Building size={20} />}
                                        </div>
                                        <input
                                            name={key}
                                            value={value || ''}
                                            onChange={(e) => handleInputChange(index, key, e.target.value)}
                                            className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${!value || value.trim() === '' ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                        />
                                        {(!value || value.trim() === '') && (
                                            <div className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle size={16} className="mr-1" />
                                                This field cannot be empty.
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleConfirmForm(index)}
                                className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all flex items-center justify-center"
                            >
                                <Check className="mr-2" size={20} />
                                Confirm Form
                            </button>
                        </>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Check className="text-green-500" size={24} />
                                <span className="text-lg text-black">Form confirmed for {result.filename}</span>
                            </div>
                            <button
                                onClick={() => {
                                    const updatedConfirmedForms = [...confirmedForms];
                                    updatedConfirmedForms[index] = false;
                                    setConfirmedForms(updatedConfirmedForms);
                                }}
                                className="text-black hover:text-gray-600 flex items-center"
                            >
                                <Edit2 className="mr-1" size={16} />
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <button
                onClick={handleSubmit}
                disabled={!confirmedForms.every((confirmed) => confirmed)}
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 ${!confirmedForms.every((confirmed) => confirmed) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                Submit All Data
            </button>
            <Link href="/" className="flex text-black underline hover:no-underline mt-4">
                Back
            </Link>
        </div>
    );
}
