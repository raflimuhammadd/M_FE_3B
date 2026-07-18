import {useNavigate} from 'react-router-dom';

function Hero({featuredFilm}) {
    const navigate = useNavigate();

    if (!featuredFilm) {
        return null;
    }

    return (
        <section className="
            relative min-h-[50vh] xs:min-h-[55vh] 
            sm:min-h-[65vh] md:min-h-[75vh] 
            lg:min-h-[85vh] overflow-hidden">
            {/* background image */}
            <img 
                src={featuredFilm.hoverImage} 
                alt={featuredFilm.title} 
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-chill-dark via-black/75 to-black/20">
                <div className="relative z-10 h-full flex items-end py-12 container-responsive">
                    <div className="w-full flex flex-col">
                        <div className="max-w-2xl mb-0">
                            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 xs:mb-4 leading-tight">
                                {featuredFilm.title}
                            </h1>

                            {/* description */}
                            <p className="
                                text-white/80 text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 
                                max-w-[50ch] line-clamp-3 xs:line-clamp-4 sm:line-clamp-none
                            ">
                                {featuredFilm.description}
                            </p>
                        </div>

                        {/* actions btn - FULL WIDTH */}
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-wrap">
                                <button
                                    onClick={() => navigate(`/watch/${featuredFilm.id}`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold
                                    px-2.5 sm:px-8 py-2 sm:py-3 rounded-full transition shrink-0 text-xs sm:text-base"
                                >
                                    Mulai
                                </button>

                                <button
                                    onClick={() => navigate(`/detail/${featuredFilm.id}`)}
                                    className="bg-white/20 hover:bg-white/30 text-white font-semibold
                                    px-2.5 sm:px-8 py-2 sm:py-3 rounded-full transition flex items-center gap-1 sm:gap-2 shrink-0 text-xs sm:text-base"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 16v-4M12 8h.01"/>
                                    </svg>
                                    Selengkapnya
                                </button>
                                
                                <span className=" text-white border border-chill-gray-700 px-1.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold shrink-0 text-xs sm:text-base">
                                    {featuredFilm.age}
                                </span>
                            </div>

                            <button
                                className="flex items-center justify-center w-9 sm:w-12 h-9 sm:h-12
                                rounded-full bg-white/20 hover:bg-white/30 transition shrink-0"
                                aria-label="Mute/Unmute"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                    <line x1="23" y1="9" x2="17" y2="15"/>
                                    <line x1="17" y1="9" x2="23" y2="15"/>
                                </svg>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default Hero;