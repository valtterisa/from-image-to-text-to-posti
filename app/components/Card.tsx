import React from 'react'

type CardProps = {
    title: string
    description: string
    subtitle?: string
    image?: string
    className?: string
}

export const Card: React.FC<CardProps> = ({ title, description, subtitle, image, className }) => {
    return (
        <div className={`rounded-lg p-4 border shadow-md ${className}`}>
            {image && (
                <div className="mb-4">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-40 object-cover rounded-t-lg"
                    />
                </div>
            )}
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
                {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    )
}
