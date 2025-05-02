import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
export default function Home() {
    const { auth } = useContext(AuthContext);
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg sm:max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Welcome {auth.user?.email}</h1>
                <p className="text-center text-gray-700">You are logged in as {auth.user?.role}</p>
            </div>
        </div>
    );
}