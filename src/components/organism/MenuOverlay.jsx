import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

function MenuOverlay({isOpen, onClose, onLogout}) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}>
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />

            <div
                className={`absolute inset-0 flex flex-col items-center justify-center bg-chill-dark/95 
                    transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <nav className="flex flex-col items-center gap-6 text-white">
                    <Link
                        to="/home"
                        onClick={onClose}
                        className="text-2xl font-medium text-white/80 hover:text-red-500 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/series"
                        onClick={onClose}
                        className="text-2xl font-medium text-white/80 hover:text-red-500 transition-colors"
                    >
                        Series
                    </Link>
                    <Link
                        to="/film"
                        onClick={onClose}
                        className="text-2xl font-medium text-white/80 hover:text-red-500 transition-colors"
                    >
                        Film
                    </Link>
                    <Link
                        to="/my-list"
                        onClick={onClose}
                        className="text-2xl font-medium text-white/80 hover:text-red-500 transition-colors"
                    >
                        My List
                    </Link>
                    <Link
                        to="#"
                        onClick={onClose}
                        className="text-2xl font-medium text-white/80 hover:text-red-500 transition-colors"
                    >
                        Genre
                    </Link>
                    <div className="w-48 border-t border-white/20 my-2" />
                    <button
                        onClick={onClose}
                        className="text-2xl font-medium text-white/80 active:text-red-500 transition-colors"
                    >
                        Account
                    </button>
                    <button
                        onClick={onLogout}
                        className="text-2xl font-medium text-white/80 active:text-red-500 transition-colors"
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={onClose}
                        className="mt-4 w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center text-white/60 hover:border-white hover:text-white transition-colors"
                        aria-label="Close menu"
                    >
                        <Icon name="x" className="w-6 h-6"/>
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default MenuOverlay;
