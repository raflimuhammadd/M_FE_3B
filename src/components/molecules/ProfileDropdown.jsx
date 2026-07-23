import { useState, useEffect, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import useAuthStore from "../../store/authStore";

function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {logout} = useAuthStore();
    const navigate = useNavigate();

    // close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, setIsOpen]);


    const handleLogout = () => {
        setIsOpen(false);
        logout();
        navigate('/login');
    };

    return (
        <div ref={dropdownRef} className="profile-dropdown relative">
            {/* profile button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="profile-dropdown-toggle h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full hover:bg-[#E50914] transition
                flex items-center justify-center cursor-pointer"
                aria-label="Profile menu"
            >
                <img src="/assets/images/profile.png" 
                alt="Profile"
                className="profile-dropdown-avatar h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full" 
            />
            </button>

            {/* dropdown menu */}
            {isOpen && (
                <div className="profile-dropdown-menu absolute right-0 mt-2 w-40 xs:w-44 sm:w-48 bg-[#181a1c] border
                    border-white/20 rounded-lg shadow-lg z-50">
                {/* profil */}
                <button
                    onClick={() => {
                        setIsOpen(false);
                        navigate('/profile');
                    }}
                    className="profile-dropdown-item profile-dropdown-item--profile 
                        w-full px-3 py-4 text-left text-white hover:text-red-500
                        transition flex items-center gap-3 border-b border-white/10"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Profil Saya
                </button>

                {/* premium */}
                <button
                    onClick={() => {
                        setIsOpen(false);
                        navigate('/profile');
                    }}
                    className="profile-dropdown-item profile-dropdown-item--premium 
                        w-full px-4 py-3 text-left text-white hover:text-red-500
                        transition flex items-center gap-3 border-b border-white/10"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 20h20v2H2v-2zM4 8l4 4 4-8 4 8 4-4v9H4V8z"/>
                    </svg>
                    Ubah Premium
                </button>

                {/* quit */}
                <button
                    onClick={handleLogout}
                    className="profile-dropdown-item profile-dropdown-item--quit 
                        w-full px-4 py-3 text-left text-white hover:text-red-500
                        transition flex items-center gap-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Keluar
                </button>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown;