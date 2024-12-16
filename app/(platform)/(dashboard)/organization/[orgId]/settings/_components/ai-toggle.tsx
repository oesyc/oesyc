"use client";
import { useState } from "react";

import { useProModal } from "@/hooks/use-pro-model";

interface AiToggle {
    isPro: boolean;
}
const AiToggle = ({isPro}:AiToggle) => {
    const [isToggleOn, setIsToggleOn] = useState(false);
    const proModal = useProModal();
    const handleToggleClick = () => {
        if (!isPro) {
            // This function will run if `isPro` is false
            proModal.onOpen();
        } else {
            // This function will toggle the state if `isPro` is true
            setIsToggleOn(prev => !prev);
        }
    };

    return (
        
            <div className="mt-4 flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={isToggleOn}
                        onChange={handleToggleClick}
                    />
                    <div className="w-10 h-6 bg-gray-400 rounded-full border border-gray-600"></div>
                    <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-1 ${
                            isToggleOn ? "left-6" : "left-1"
                        } transition-transform duration-300`}
                    ></div>
                </label>
            </div>
        
    );
};

export default AiToggle;
