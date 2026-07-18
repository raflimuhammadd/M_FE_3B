import {Navbar, Hero, Footer} from '../components';
import {ContentSection} from '../components';
import filmData from '../data/filmData';

function SeriesPage() {
    // convert data object to arrray
    const allFilms = Object.values(filmData);

    // filter film only (ambil yg ada totalScreen)
    const isFilm = (item) => item.duration !== undefined;

    const films = allFilms.filter(isFilm);

    // used to hero series
    const featuredFilms = films.find(film => film.title.includes('Avatar')) || films[0];

    // section 1: LanjutTontonan
    const progressValues = [12, 30, 45, 60, 75, 90];
    const continueWatchingFilms = films.slice(0, 6).map((film, index) => ({
        ...film,
        progress: progressValues[index] || 20
    }));

    // section 2: Top Rating
    const popularFilms = films
        .filter(film => film.rating && parseFloat(film.rating))
        .slice(0, 6);

    // section 3: TopRating
    const topRatingFilms = films
        .sort((a, b) => {
            const aRating = parseFloat(a.rating);
            const bRating = parseFloat(b.rating);
            return bRating - aRating;
        })
        .slice(0, 6);

    // section 4: Trending
    const trendingFilms = films
        .filter(s => s.topRank)
        .sort((a, b) => (a.topRank || 999) - (b.topRank || 999))
        .slice(0, 6);

    // section 5: Genre
    const newReleaseFilms = films
        .slice(0, 6)
        .map((film, index) => ({
            ...film,
            hasNewEpisode: index % 3 === 0, //ambil new episode
            topRank: index < 3 ? index + 1 : null //ambil top rank
        }))
    // const newReleaseSeries = series
    //     .filter(s => s.hasNewEpisode || s.isPremium)
    //     .slice(0, 6);

    return (
        <div className="min-h-screen bg-chill-dark">
            <Navbar />

            <Hero featuredFilm={featuredFilms} />

            <main className="bg-chill-dark relative z-20 py-8">
                <div className="container-responsive space-y-12">
                    {/* section1: landscape */}
                    <ContentSection 
                        title="Melanjutkan Tontonan Film"
                        films={continueWatchingFilms}
                        variant="landscape"
                    />

                    {/* section2: portrait */}
                    <ContentSection 
                        title="Film Populer"
                        films={popularFilms}
                        variant="portrait"
                    />

                    {/* section3: portrait */}
                    <ContentSection 
                        title="Top Rating Film Hari ini"
                        films={topRatingFilms}
                        variant="portrait"
                    />

                    {/* section4: portrait */}
                    <ContentSection 
                        title="Film Trending"
                        films={trendingFilms}
                        variant="portrait"
                    />

                    {/* section5: genre */}
                    {newReleaseFilms.length > 0 && (
                        <ContentSection 
                            title="Rilis Baru"
                            films={newReleaseFilms}
                            variant="portrait"
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SeriesPage;