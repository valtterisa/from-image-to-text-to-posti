export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mb-4"></div>
            <p className="text-text">Processing, please wait...</p>
        </div>
    )
}

