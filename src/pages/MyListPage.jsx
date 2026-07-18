import { useState } from 'react';
import { Navbar, Footer } from '../components';
import { useFavorites } from '../hooks/useFavorites';
import MyListGrid from '../components/organism/MyListGrid';

function MyListPage () {
  const {getFavoriteItems} = useFavorites();
  const [activeTab, setActiveTab] = useState('all');

  // get all favorite items
  const allItems = getFavoriteItems();

  // filter logic
  const filteredItems = {
    all: allItems,
    series: allItems.filter(item => item.episodes && item.episodes.includes(
      'Episode'
    )),
    film: allItems.filter(item => item.duration !== undefined)
  };

  // items to display based active tab
  const displayItems = filteredItems[activeTab];

  // empty message
  const emptyMessages = {
    all: 'Belum ada item di daftar Anda',
    series: 'Belum ada seri di daftar Anda',
    film: 'Belum ada film di daftar Anda'
  };

  return (
    <div className="min-h-screen bg-chill-dark">
      <Navbar />

      <main className="container-responsive py-8 sm:py-12">
        {/* header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white
        mb-6 sm:mb-8">
          Daftar Saya
        </h1>

        {/* tabs */}
         <div className="tabs-wrapper mb-6 sm:mb-8 flex gap-4 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`tab-button pb-3 px-2 text-sm sm:text-base font-medium transition
              ${activeTab === 'all' 
                ? 'text-white border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Semua
          </button>
          <button
            onClick={() => setActiveTab('series')}
            className={`tab-button pb-3 px-2 text-sm sm:text-base font-medium transition
              ${activeTab === 'series' 
                ? 'text-white border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Series
          </button>
          <button
            onClick={() => setActiveTab('film')}
            className={`tab-button pb-3 px-2 text-sm sm:text-base font-medium transition
              ${activeTab === 'film' 
                ? 'text-white border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Film
          </button>
        </div>
        
        {/* Grid */}
        <MyListGrid 
          items={displayItems}
          emptyMessage={emptyMessages[activeTab]}
        />
      </main>

      <Footer />
    </div>
  )
}

export default MyListPage;