import { useState, useEffect, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import useAuthStore from "../../store/authStore";
import { Icon } from "../atoms";

function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {user, logout} = useAuthStore();
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
                <img src={user?.avatar || '/assets/images/profile.png'} 
                alt="Profile"
                className="profile-dropdown-avatar h-8 w-8 xs:h-9 xs:w-9 
                sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full object-cover" 
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
                     <Icon name="user" className="h-5 w-5"/>
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
                     <Icon name="crown" className="h-5 w-5"/>
                    Ubah Premium
                </button>

                {/* quit */}
                <button
                    onClick={handleLogout}
                    className="profile-dropdown-item profile-dropdown-item--quit 
                        w-full px-4 py-3 text-left text-white hover:text-red-500
                        transition flex items-center gap-3"
                >
                    <Icon name="logout" className="h-5 w-5"/>
                    Keluar
                </button>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown;