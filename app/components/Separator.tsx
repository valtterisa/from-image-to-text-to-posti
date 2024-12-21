import React from 'react'

type SeparatorType = {
    text: string
}

export default function Separator({ text }: SeparatorType) {
    return (
        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-black"></div>
            <span className="flex items-center mx-4 text-black font-medium">{text}</span>
            <div className="flex-grow border-t border-black"></div>
        </div>
    )
}