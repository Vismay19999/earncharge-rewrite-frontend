"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiHome5Fill, RiUser3Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { getAccessToken } from "@/utils/auth";

const BottomNavigation = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null); // Initialize as null
    const [isHydrated, setIsHydrated] = useState(false); // Track hydration status

    useEffect(() => {
        const accessToken = getAccessToken() || null; // Ensure it returns null if undefined
        setToken(accessToken);
        setIsHydrated(true); // Set hydrated to true once on the client
    }, []);

    if (!isHydrated) {
        // Render an empty placeholder while waiting for hydration
        return <nav className="h-16" />;
    }

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 h-16 flex items-center justify-center gap-20 px-6 shadow-lg">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex flex-col items-center justify-center space-y-1 transition-colors hover:text-blue-500"
            >
                <FaArrowLeft size={24} />
                <span className="text-xs font-medium">Back</span>
            </button>

            {/* Home Button */}
            <Link
                href="/app"
                className="group relative -top-6 transition-transform hover:scale-105"
            >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full shadow-xl">
                    <RiHome5Fill size={24} className="text-white" />
                </div>
            </Link>

            {/* Profile/Login Button */}
            <Link
                href={token ? "/profile" : "/login"}
                className="flex flex-col items-center justify-center space-y-1 transition-colors hover:text-blue-500"
            >
                <RiUser3Line size={24} />
                <span className="text-xs font-medium">
                    {token ? "Profile" : "Login"}
                </span>
            </Link>
        </nav>
    );
};

export default BottomNavigation;
