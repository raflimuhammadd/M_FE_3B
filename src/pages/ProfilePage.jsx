import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components';
import ProfileDropdown from '../components/molecules/ProfileDropdown';
import MyListGrid from '../components/organism/MyListGrid';
import { useFavorites } from '../hooks/useFavorites';
import useAuthStore from '../store/authStore';

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M17 8l-5-5-5 5" />
      <path d="M12 3v12" />
    </svg>
  );
}

function ProfileField({ label, value, editable = false }) {
  return (
    <div className="rounded-lg border border-[#E7E3FC3B] bg-[#22282A] px-4 py-3 md:px-5 md:py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-base md:text-lg leading-snug text-white/55">
            {label}
          </p>
          <p className="text-lg md:text-xl leading-snug text-white">
            {value || '-'}
          </p>
        </div>

        {editable && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="text-white shrink-0"
          >
            <path d="M4 17.25V21h3.75L18.8 9.95l-3.75-3.75L4 17.25Zm17.7-10.2a1 1 0 0 0 0-1.4l-2.35-2.35a1 1 0 0 0-1.4 0l-1.85 1.85 3.75 3.75 1.85-1.85Z" />
          </svg>
        )}
      </div>
    </div>
  );
}

function SubscriptionCard() {
  return (
    <section className="rounded-2xl bg-[#3D4142] px-7 py-8 md:px-8 md:py-8">
      <div className="flex items-start gap-5 md:gap-6">
        <div className="pt-1 text-5xl leading-none">📯</div>

        <div className="flex-1">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight text-white">
            <span className="hidden md:inline">
              Saat ini anda belum berlangganan
            </span>
            <span className="md:hidden">Berlangganan</span>
          </h2>

          <p className="mt-3 max-w-[560px] text-base md:text-xl leading-relaxed text-white/90">
            Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
          </p>

          <div className="mt-5 md:mt-6 flex md:justify-end">
            <button className="rounded-full bg-[#2F3334] px-6 py-3 text-sm md:text-base font-bold text-white hover:bg-[#272B2C] transition">
              Mulai Berlangganan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfilePage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { getFavoriteItems } = useFavorites();
    const favoriteItems = getFavoriteItems().filter(Boolean).slice(0, 6);
    const avatarSrc = user?.avatar || '/assets/images/profile.png';

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);


  if (!user) {
    return (
      <div className="min-h-screen bg-chill-dark flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full" />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-chill-dark text-white flex flex-col">
      {/* ── HEADER ── */}
      <header className="bg-chill-dark">
        <div className="container-responsive flex items-center justify-between py-4 md:py-5">
            <div className="flex items-center gap-5 md:gap-16">
                <Link to="/home" aria-label="CHILL Home">
                    <img
                        src="/assets/images/logo-chill.png"
                        alt="CHILL"
                        className="hidden md:block h-8 w-auto"
                    />
                    <img
                        src="/assets/images/chill-vect.png"
                        alt="CHILL"
                        className="block md:hidden h-4 w-auto"
                    />
                </Link>

                <nav className="flex items-center gap-4 md:gap-10 text-xs md:text-lg
                text-white">
                    <Link to="/series" className="hover:text-white/70 transition">
                        Series
                    </Link>
                    <Link to="/film" className="hover:text-white/70 transition">
                        Film
                    </Link>
                    <Link to="/my-list" className="hover:text-white/70 transition">
                        Daftar Saya
                    </Link>
                </nav>
            </div>

            <ProfileDropdown />
        </div>
      </header>

      {/* ── MAIN ── */}
    <main className="flex-1">
         <section className="container-responsive pt-8 md:pt-14 pb-12 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(320px,560px)] gap-8 md:gap-12">
            <div className="order-2 md:order-1">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">
                Profil Saya
                </h1>

                <div className="mb-8 flex items-center gap-4 md:gap-6">
                <img
                    src={avatarSrc}
                    alt="Foto profil"
                    className="h-20 w-20 md:h-36 md:w-36 rounded-full object-cover bg-[#C4CAE8]"
                />

                <div>
                    <button className="rounded-full border border-[#3254FF] px-5 md:px-8 py-2.5 text-base md:text-lg font-bold text-[#3254FF] hover:bg-[#3254FF]/10 transition">
                    Ubah Foto
                    </button>

                    <div className="mt-3 flex items-center gap-2 text-sm md:text-base text-white/65">
                    <UploadIcon />
                    <span>Maksimal 2MB</span>
                    </div>
                </div>
                </div>

                <div className="max-w-[690px] space-y-6">
                <ProfileField
                    label="Nama Pengguna"
                    value={user?.username || '-'}
                    editable
                />
                <ProfileField
                    label="Email"
                    value={user?.email || '-'}
                />
                <ProfileField
                    label="Kata Sandi"
                    value="***************"
                    editable
                />
                </div>

                <button className="mt-8 rounded-full bg-[#09147A] px-8 py-3 text-base md:text-lg font-bold text-white hover:bg-[#111FA3] transition">
                Simpan
                </button>
            </div>

            <div className="order-1 md:order-2 md:pt-16">
                <SubscriptionCard />
            </div>
            </div>
        </section>

        <section className="container-responsive pb-12 md:pb-20">
            <div className="mb-5 md:mb-8 flex items-center justify-between">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
                Daftar Saya
            </h2>

            <Link
                to="/my-list"
                className="hidden md:block text-lg text-white hover:text-white/70 transition"
            >
                Lihat Semua
            </Link>
            </div>

            <MyListGrid
            items={favoriteItems}
            emptyMessage="Belum ada item di daftar Anda"
            />
        </section>
    </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;