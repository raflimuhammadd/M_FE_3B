import {Navbar, Hero, Footer} from '../components';
import {ContentSection, SeriesDetailModal} from '../components';
import filmData from '../data/filmData';
import {useDetailModal} from '../hooks';

function SeriesPage() {
    const { isOpen, selectedItem, isMobile, openModal, closeModal, handleBackdropClick } = useDetailModal();
    // convert data object to arrray
    const allFilms = Object.values(filmData);

    // filter series only (ambil yg ada episode)
    const isSeries = (film) => {
        return film.episodes && film.episodes.includes('Episode');
    };

    const series = allFilms.filter(isSeries);

    // used to hero series
    const featuredSeries = series.find(s => s.title.includes('Happiness')) || series[0];

    // section 1: LanjutTontonan
    const progressValues = [12, 30, 45, 60, 75, 90];
    const continueWatchingSeries = series.slice(0, 6).map((film, index) => ({
        ...film,
        progress: progressValues[index] || 20
    }));

    // section 2: Top Rating
    const popularSeries = series
        .filter(s => s.rating && parseFloat(s.rating) >= 4.5)
        .slice(0, 6);

    // section 3: TopRating
    const topRatingSeries = series
        .sort((a, b) => {
            const aRating = parseFloat(a.rating);
            const bRating = parseFloat(b.rating);
            return bRating - aRating;
        })
        .slice(0, 6);

    // section 4: Trending
    const trendingSeries = series
        .filter(s => s.topRank)
        .sort((a, b) => (a.topRank || 999) - (b.topRank || 999))
        .slice(0, 6);

    // section 5: Genre
    const newReleaseSeries = series
        .slice(0, 6)
        .map((film, index) => ({
            ...film,
            hasNewEpisode: index % 3 === 0, //ambil new episode
            topRank: index < 3 ? index + 1 : null //ambil top rank
        }))

    return (
        <div className="min-h-screen bg-chill-dark">
            <Navbar />

            <Hero featuredFilm={featuredSeries} />

            <main className="bg-chill-dark relative z-20 py-8">
                <div className="container-responsive space-y-12">
                    {/* section1: landscape */}
                    <ContentSection 
                        title="Melanjutkan Tontonan Series"
                        items={continueWatchingSeries}
                        variant="landscape"
                        onSelect={openModal}
                    />

                    {/* section2: portrait */}
                    <ContentSection 
                        title="Series Populer"
                        items={popularSeries}
                        variant="portrait"
                        onSelect={openModal}
                    />

                    {/* section3: portrait */}
                    <ContentSection 
                        title="Top Rating Series Hari ini"
                        items={topRatingSeries}
                        variant="portrait"
                        onSelect={openModal}
                    />

                    {/* section4: portrait */}
                    <ContentSection 
                        title="Series Trending"
                        items={trendingSeries}
                        variant="portrait"
                        onSelect={openModal}
                    />

                    {/* section5: genre */}
                    {newReleaseSeries.length > 0 && (
                        <ContentSection 
                            title="Rilis Baru"
                            items={newReleaseSeries}
                            variant="portrait"
                            onSelect={openModal}
                        />
                    )}
                </div>
            </main>

            <Footer />
            
            {/* Series Detail Modal */}
            <SeriesDetailModal
                isOpen={isOpen}
                series={selectedItem}
                isMobile={isMobile}
                closeModal={closeModal}
                handleBackdropClick={handleBackdropClick}
            />
        </div>
    )
}

export default SeriesPage;