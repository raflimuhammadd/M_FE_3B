import MovieCard from '../molecules/MovieCard';
import Icon from '../atoms/Icon';

/**
 * Grid component untuk display favorites
 * 
 * @param {Array} items
 * @param {string} emptyMessage
 */
function MyListGrid({ items, emptyMessage, onSelect }) {
  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className="my-list-empty-state text-center py-20">
        <div className="empty-state-icon mb-6">
          <Icon name="bookmark" className="h-16 w-16 mx-auto text-gray-600" />
        </div>
        <p className="empty-state-message text-gray-400 text-base sm:text-lg max-w-md mx-auto">
          {emptyMessage || "Belum ada item di daftar Anda"}
        </p>
      </div>
    );
  }

  // Grid with items
  return (
    <div className="my-list-grid">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {items.map((item) => (
          <MovieCard
            key={item.id}
            item={item}
            variant="portrait"
            showNewEpisode={item.hasNewEpisode}
            hoverVariant='mylist'
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default MyListGrid;