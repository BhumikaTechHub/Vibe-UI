import React from 'react';

export const SkeletonLoader = () => {
    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-4 animate-pulse">
            {/* Header Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
            
            {/* Body Text Skeleton */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>

            {/* Input Skeleton */}
            <div className="h-10 bg-gray-200 rounded"></div>

            {/* Button Skeleton */}
            <div className="h-12 bg-gray-300 rounded w-full mt-6"></div>
            
            <div className="text-center text-xs text-gray-400 mt-4">
                💎 Gemini 3 is tailoring your UI...
            </div>
        </div>
    );
};
