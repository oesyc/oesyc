import Image from 'next/image';
import { useEffect, useState } from 'react';

const Logo = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check if dark mode is enabled (you may have your own logic)
        const darkMode = document.documentElement.classList.contains('dark');
        setIsDarkMode(darkMode);
    }, []);

    return (
        <div className="flex items-center justify-center">
            <Image
                src={isDarkMode ? '/Oesyc.png' : '/Oesyc.png'}
                alt="Logo"
                width={100} // Adjust width as needed
                height={50} // Adjust height as needed
                className="object-contain" // Optional: adjust for your design
            />
        </div>
    );
};

export default Logo;