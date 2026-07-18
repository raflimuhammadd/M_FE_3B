import Icon from '../atoms/Icon';
import Badge from '../atoms/Badge';
import HoverOverlay from './HoverOverlay';
import HoverOverlayLandscape from './HoverOverlayLandscape';

function MovieCard({ film, variant = 'portrait', progress, showNewEpisode = false, onSelect }) {
  if (!film) return null;
  const displayProgress = progress;
  const isSeries = film.episodes && film.episodes.includes('Episode');

  const handleSelect = () => {
    if (isSeries && onSelect) {
      onSelect(film);
    }
  };

  if (variant === 'portrait') {
    return (
      <article onClick={handleSelect} className="movie-card movie-card-portrait shrink-0 w-[120px] xs:w-[140px] sm:w-44 md:w-52 lg:w-[234px] group cursor-pointer">
        <div className="movie-card-image-wrapper relative aspect-2/3 rounded-lg overflow-hidden mb-2">
          <img src={film.image} alt={film.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.08]" />
          
          
          {/* Top-left: Premium OR Episode Baru */}
            {film.isPremium ? (
              <Badge variant="premium" className="movie-card-badge movie-card-badge-premium top-2 left-2">Premium</Badge>
            ) : showNewEpisode && (
              <Badge variant="episode" className="movie-card-badge movie-card-badge-episode top-2 left-2">Episode Baru</Badge>
            )}
            {/* Top-right: Top 10 */}
            {film.topRank && (
              <Badge variant="top10" className="top-0 right-2">
                TOP<br />{film.topRank}
              </Badge>
            )}

            {/* Bottom-left: Rating */}
            {film.rating && (
              <Badge variant="rating" className="bottom-2 left-2">
                <Icon name="star" className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
                <span>{film.rating}</span>
              </Badge>
            )}
            <HoverOverlay film={film} />
        </div>
        <h3 className="movie-card-title text-white text-xs xs:text-sm sm:text-base font-medium truncate text-center">
          {film.title}
        </h3>
      </article>
    );
  }

  return (
    <article onClick={handleSelect} className="movie-card movie-card--landscape shrink-0 w-[200px] xs:w-[220px] sm:w-64 md:w-72 lg:w-80 xl:w-[320px] group cursor-pointer">
      <div className="movie-card-image-wrapper relative aspect-video rounded-lg overflow-hidden mb-2">
        <img 
          src={film.hoverImage} 
          alt={film.title} 
          className="movie-card-image w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        
        {showNewEpisode && (
          <Badge 
            variant="episode" 
            className="movie-card-badge top-2 left-2 group-hover:opacity-0 group-hover:invisible transition-all duration-200"
          >
            Episode Baru
          </Badge>
        )}
        
        <div className="movie-card-progress absolute bottom-0 left-0 right-0 h-1 bg-gray-800 group-hover:opacity-0 group-hover:invisible transition-all duration-200">
          <div 
            className="movie-card-progress-fill h-full bg-red-600 transition-all duration-300" 
            style={{ width: `${displayProgress}%` }} 
          />
        </div>


        <div className="movie-card-progress absolute bottom-0 left-0 right-0
              h-1 bg-gray-800 group-hover:opacity-0 group-hover:invisible transition-all
              duration-200">
            <div className="movie-card-progress-fill h-full bg-red-600
                  transition-all duration-300" 
                  style={{width: `${displayProgress}%`}}
                />
        </div>
        <HoverOverlayLandscape film={film} />

      </div>
      
      <h3 className="movie-card-title text-white text-xs xs:text-sm sm:text-base font-medium truncate">
        {film.title}
      </h3>
    </article>
  );
}
export default MovieCard;