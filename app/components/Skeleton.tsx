export const Skeleton = ({ type }: { type: 'image' | 'text' }) => {
    if (type === 'image') {
        return (
            <div className="w-16 h-16 bg-gray-300 animate-pulse rounded"></div> // Image skeleton
        );
    } else {
        return (
            <div className="max-w-screen-lg w-full min-h-[5.25rem] mb-4 p-3 bg-gray-100 rounded shadow animate-pulse">
                <h2 className="text-lg font-semibold text-black bg-gray-300 w-full h-[1.75rem] rounded"></h2> {/* Skeleton for the title */}
                <p className="mt-2 text-gray-800 bg-gray-300 w-full h-[1.5rem] rounded"></p> {/* Skeleton for the text */}
            </div >
        );
    }
};
