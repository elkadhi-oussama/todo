// src/components/NotFound.tsx
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96 text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Not Found</h1>
                <p className="text-gray-700 mb-4">The page you are looking for does not exist.</p>
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default NotFound;
