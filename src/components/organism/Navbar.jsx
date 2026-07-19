import ProfileDropdown from "../molecules/ProfileDropdown";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar sticky top-0 w-full z-50 bg-[rgba-(15,15,15,0.75)] backdrop-blur border-b border-white/10">
      <div className="navbar-container container-responsive py-2 xs:py-2.5 sm:py-3 md:py-4">
        <div className="navbar-wrapper flex items-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="navbar-left flex items-center gap-3 xs:gap-4 sm:gap-6 md:gap-8">
            <a href="/home" className="navbar-logo">
              <img
                src="../../../publ../public/assets/images/chill-vect.png"
                alt="CHILL"
                className="h-5 xs:h-6 w-auto block sm:hidden"
              />
              <img
                src="../../../public/assets/images/logo-chill.png"
                alt="CHILL"
                className="h-7 sm:h-8 md:h-10 w-auto hidden sm:block"
              />
            </a>
            <ul className="navbar-menu flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6">
              <li className="navbar-menu-item">
                <Link to="/series" className="navbar-menu-link text-white/80 hover:text-red-500 transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                    Series
                </Link>
              </li>
              <li className="navbar-menu-item">
                <Link to="/film" className="navbar-menu-link text-white/80 hover:text-red-500 transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                    Film
                </Link>
              </li>
              <li className="navbar-menu-item">
                <Link to="/my-list" className="navbar-menu-link text-white/80 hover:text-red-500 transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                    Daftar Saya
                </Link>
              </li>
              <li className="navbar-menu-item">
                <Link to="#" className="navbar-menu-link text-white/80 hover:text-red-500 transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                    Genre
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-right ml-auto">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
