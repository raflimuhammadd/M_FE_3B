import ProfileDropdown from "../../features/profile/components/ProfileDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import MenuOverlay from './MenuOverlay';
import Icon from '../ui/Icon';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
     setIsScrolled(window.scrollY > 10); 
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav className={`navbar fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-chill-dark/80 backdrop-blur-md border-b border-white/10'
        : 'bg-transparent'
    }`}>
      <div className="navbar-container container-responsive py-2 xs:py-2.5 sm:py-3 md:py-4">
        <div className="navbar-wrapper flex items-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="navbar-left flex items-center gap-3 xs:gap-4 sm:gap-6 md:gap-8">
            <NavLink to="/home" className="navbar-logo">
              <img
                src="/assets/images/chill-vect.png"
                alt="CHILL"
                className="h-5 xs:h-6 w-auto block sm:hidden"
              />
              <img
                src="/assets/images/logo-chill.png"
                alt="CHILL"
                className="h-7 sm:h-8 md:h-10 w-auto hidden sm:block"
              />
            </NavLink>
            <ul className="navbar-menu hidden sm:flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6">
              <li className="navbar-menu-item">
                <NavLink to="/series" 
                className={({isActive}) => 
                `navbar-menu-link ${isActive ? 'text-red-500' : 'text-white/80'} 
                transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 
                font-medium`}>
                    Series
                </NavLink>
              </li>
              <li className="navbar-menu-item">
                <NavLink to="/film" 
                className={({isActive}) => 
                `navbar-menu-link ${isActive ? 'text-red-500' : 'text-white/80'} 
                transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 
                font-medium`}
                >
                    Film
                </NavLink>
              </li>
              <li className="navbar-menu-item">
                <NavLink to="/my-list" 
                className={({isActive}) => 
                `navbar-menu-link ${isActive ? 'text-red-500' : 'text-white/80'} 
                transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 
                font-medium`}
                >
                    Daftar Saya
                </NavLink>
              </li>
              <li className="navbar-menu-item">
                <NavLink to="/watch-history"
                className={({isActive}) => 
                `navbar-menu-link ${isActive ? 'text-red-500' : 'text-white/80'} 
                transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 
                font-medium`}
                >
                    History
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-right ml-auto flex items-center gap-3">
            <div className="hidden sm:block">
              <ProfileDropdown />
            </div>

            <div className="sm:hidden">
              <ProfileDropdown />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden flex items-center gap-2"
              aria-label="Open menu"
            >
                <Icon name="hamburger" className="w-6 h-6 stroke-white"/>
            </button>
          </div>
        </div>
      </div>
    </nav>

     {/* menu overlay */}
    <MenuOverlay 
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              onLogout={() => {
                setIsMobileMenuOpen(false);
                navigate('/login');
              }}
    />

    </>
  );
}

export default Navbar;
