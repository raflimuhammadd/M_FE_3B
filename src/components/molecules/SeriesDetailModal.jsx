import { useEffect, useRef } from 'react';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import EpisodeCard from './EpisodeCard';

function SeriesDetailModal({ 
  isOpen, 
  series, 
  isMobile, 
  closeModal, 
  handleBackdropClick 
}) {
  const modalRef = useRef(null);

  // Focus trap and animation
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
      
      // Add animation class
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.classList.add('animate-slide-up');
        }
      }, 10);
    }
  }, [isOpen]);

  if (!isOpen || !series) return null;

  const {
    title,
    rating,
    age,
    episodes,
    year,
    genres,
    description,
    cast,
    creator,
    episodesList = [],
    image,
    hoverImage
  } = series;

  // Action handlers
  const handlePlayClick = () => {
    console.log(`Play ${title}`);
    // TODO: Navigate to watch page
    closeModal();
  };

  const handleFavoriteClick = () => {
    console.log(`Toggle favorite for ${title}`);
    // TODO: Integrate with favorites context
  };

  const handleMuteClick = () => {
    console.log(`Toggle mute`);
    // TODO: Implement mute functionality
  };

  // Render desktop modal vs mobile bottom sheet
  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-end"
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Bottom sheet */}
        <div 
          ref={modalRef}
          className="relative w-full bg-chill-dark rounded-t-2xl overflow-hidden max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div className="flex justify-center py-3">
            <div className="w-12 h-1.5 bg-white/30 rounded-full" />
          </div>

          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition"
            aria-label="Close"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero section */}
            <div className="relative h-64">
              <img 
                src={hoverImage || image} 
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chill-dark via-chill-dark/50 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Badge variant="rating">
                    <Icon name="star" className="h-3 w-3" />
                    <span>{rating}</span>
                  </Badge>
                  <span>{year}</span>
                  <span>{age}</span>
                  <span>{episodes}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Button 
                variant="primary" 
                size="md"
                className="flex-1 mr-2"
                onClick={handlePlayClick}
              >
                <Icon name="play" className="h-4 w-4 mr-2" />
                Mulai
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={handleFavoriteClick}
                className="w-12"
              >
                <Icon name="plus" className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={handleMuteClick}
                className="w-12"
              >
                <Icon name="speaker-x" className="h-5 w-5" />
              </Button>
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-white/80 text-sm mb-4">{description}</p>
              
              {/* Metadata */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <h3 className="text-white/60 text-xs mb-2">Cast</h3>
                  <p className="text-white text-sm">
                    {Array.isArray(cast) ? cast.slice(0, 3).join(', ') : ''}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-xs mb-2">Creator</h3>
                  <p className="text-white text-sm">{creator}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-xs mb-2">Genres</h3>
                  <p className="text-white text-sm">
                    {Array.isArray(genres) ? genres.join(', ') : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Episodes section */}
            {episodesList.length > 0 && (
              <div className="px-4 pb-8">
                <h2 className="text-xl font-bold text-white mb-4">Episodes</h2>
                <div className="space-y-3">
                  {episodesList.map((episode) => (
                    <EpisodeCard 
                      key={episode.id}
                      episode={episode}
                      seriesTitle={title}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop modal
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl bg-chill-dark rounded-xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition"
          aria-label="Close"
        >
          <Icon name="x" className="h-5 w-5" />
        </button>

        {/* Hero section */}
        <div className="relative h-72">
          <img 
            src={hoverImage || image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chill-dark via-chill-dark/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                <div className="flex items-center gap-4 text-white/80 text-base">
                  <Badge variant="rating">
                    <Icon name="star" className="h-4 w-4" />
                    <span>{rating}</span>
                  </Badge>
                  <span>{year}</span>
                  <span>{age}</span>
                  <span>{episodes}</span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="flex items-center"
                  onClick={handlePlayClick}
                >
                  <Icon name="play" className="h-5 w-5 mr-2" />
                  Mulai
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={handleFavoriteClick}
                  className="w-12 h-12"
                >
                  <Icon name="plus" className="h-6 w-6" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={handleMuteClick}
                  className="w-12 h-12"
                >
                  <Icon name="speaker-x" className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left column: Description */}
            <div>
              <h2 className="text-white font-bold text-lg mb-3">Sinopsis</h2>
              <p className="text-white/80 text-base mb-6">{description}</p>
            </div>

            {/* Right column: Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-white/60 text-sm mb-2">Cast</h3>
                <p className="text-white text-base">
                  {Array.isArray(cast) ? cast.slice(0, 4).join(', ') : ''}
                </p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-2">Creator</h3>
                <p className="text-white text-base">{creator}</p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-2">Year</h3>
                <p className="text-white text-base">{year}</p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-2">Genres</h3>
                <p className="text-white text-base">
                  {Array.isArray(genres) ? genres.join(', ') : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Episodes section */}
          {episodesList.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {episodesList.map((episode) => (
                  <EpisodeCard 
                    key={episode.id}
                    episode={episode}
                    seriesTitle={title}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeriesDetailModal;