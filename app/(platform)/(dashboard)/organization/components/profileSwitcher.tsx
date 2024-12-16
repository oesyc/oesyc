import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LuChevronsUpDown } from 'react-icons/lu'; 
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Icons for Profile and Logout
import { useRouter } from 'next/navigation';
import LogoutButton from './logoutButton';
import { useSession } from 'next-auth/react';





interface User {
  image: string;
  name: string;
}

const ProfileSwitcher: React.FC<{ user: User }> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown div
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference to the user info div
    const router = useRouter();
    const {data: session} = useSession();
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex space-x-1 items-center justify-center cursor-pointer">
      {session ? (<Image src={session.user?.image} alt="userImage" width={30} height={30} className="rounded-full" />):(
      <Image src={user.image} alt="userImage" width={30} height={30} className="rounded-full" />
    )}
      <p>{user.name}</p>
      <LuChevronsUpDown className="h-3 w-3" onClick={toggleDropdown} />
      
      {isDropdownOpen && (
        <div ref={dropdownRef} className="absolute mt-[130px] w-48 bg-white shadow-lg rounded-md z-10">
          <ul className="flex flex-col">
            <li>
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                <FaUser className="mr-2" /> Profile
              </a>
            </li>
            <li>
              <LogoutButton/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitcher;
