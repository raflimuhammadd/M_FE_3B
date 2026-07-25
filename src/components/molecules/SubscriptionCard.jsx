import Icon from '../atoms/Icon';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function SubscriptionCard({isSubscribed = false}) {
    const navigate = useNavigate();
    const removePremium = useAuthStore((s) => s.removePremium);

    if (isSubscribed) {
        return (
            <section className="rounded-2xl bg-linear-to-br from-[#192DB7]
            to-[#5370D4] px--7 py-8 md:px-8 md:py-8">
                <div className="flex items-start gap-5 md:gap-6">
                    <div className="flex h-14 w-14 items-center justify-center
                    rounded-full bg-white/10">
                        <Icon name="crown" className='h-7 w-7'/>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl md:text-[32px]
                            font-bold leading-tight text-white">
                                Akun Premium Individual ✨
                            </h2>
                            <span className="shrink-0 rounded-full bg-green-500/20
                            px-3 py-1 text-xs font-bold text-green-300">
                                AKTIF
                            </span>
                        </div>

                        <p className="mt-3 max-w-140 text-base md:text-xl leading-relaxed
                        text-white/90">
                            Saat ini kamu sedang menggunakan akses akun premium
                        </p>

                        <p className="mt-3 max-w-140 text-sm md:text-sm leading-relaxed
                        text-white/50">
                            Berlaku hingga 31 Desember 2045
                        </p>
                    </div>
                </div>

                <div className="mt-5 md:mt-6 flex md:justify-end">
                    <button
                        onClick={removePremium}
                        className="rounded-full border border-red-400 
                        px-6 py-3 text-sm md:text-base font-bold text-red-400 
                        hover:text-white hover:bg-red-700 transition duration-300
                        cursor-pointer"
                    >
                        Nonaktifkan Premium
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-2xl bg-[#3D4142] px-7 py-8 md:px-8 md:py-8">
            <div className="flex items-start gap-5 md:gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Icon name="premium" className="h-7 w-7" />
                </div>
                <div className="flex-1">
                <h2 className="text-2xl md:text-[32px] font-bold leading-tight text-white">
                    <span className="hidden md:inline">
                    Saat ini anda belum berlangganan
                    </span>
                    <span className="md:hidden">Berlangganan</span>
                </h2>

                <p className="mt-3 max-w-140 text-base md:text-xl leading-relaxed text-white/90">
                    Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
                </p>

                <div className="mt-5 md:mt-6 flex md:justify-end">
                    {/* <button className="rounded-full bg-[#2F3334] 
                    px-6 py-3 text-sm md:text-base font-bold text-white 
                    hover:bg-[#272B2C] transition">
                    Mulai Berlangganan
                    </button> */}
                    <button
                        onClick={() => navigate('/premium')}
                        className="rounded-full bg-[#2F3334] px-6 py-3 text-sm 
                        md:text-base font-bold text-white hover:bg-chill-gray 
                        transition duration-300 cursor-pointer"
                    >
                    Mulai Berlangganan
                    </button>
                </div>
                </div>
            </div>
        </section>
    )
}

export default SubscriptionCard