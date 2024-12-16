import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LuChevronsUpDown } from 'react-icons/lu'; 
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Icons for Profile and Logout
import { useRouter } from 'next/navigation';
import LogoutButton from './logoutButton';
import { useSession } from 'next-auth/react';





interface Users {
  profileImage: string;
  email: string;
}

const MemberSwitcher: React.FC<{ users: Users[] }> = ({ users }) => {
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
    <div ref={containerRef} className="relative flex items-center space-x-2 cursor-pointer">
      <FaUser className="text-gray-700" />
      <p className="text-gray-700">Members</p>
      <LuChevronsUpDown className="h-4 w-4 text-gray-700" onClick={toggleDropdown} />

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-[130px] bg-white shadow-lg rounded-md z-10"
        >
          <ul className="flex flex-col divide-y divide-gray-200">
            {users.map((user, index) => (
              <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-100">
                {/* User Image */}
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={user.profileImage}
                    alt={user.email}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                {/* User Name */}
                <span className="ml-4 text-gray-800">{user.email}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MemberSwitcher;
