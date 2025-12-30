import React, { useState, useEffect } from 'react';
import './App.css';
import GameCard from './components/GameCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import Toast from './components/Toast';

function App() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    platform: 'all',
    priceRange: 'all',
    sortBy: 'name'
  });
  const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const fetchGames = async (search = '') => {
    setLoading(true);
    try {
      // Use relative URL for production (Netlify functions)
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? '/api' 
        : 'http://localhost:5000/api';
      
      // Pridedame timestamp, kad išvengtume cache
      const timestamp = new Date().getTime();
      const url = search 
        ? `${baseUrl}/list?search=${encodeURIComponent(search)}&t=${timestamp}`
        : `${baseUrl}/list?t=${timestamp}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      const gamesList = data.games || [];
      setGames(gamesList);
      applyFilters(gamesList, filters);
    } catch (error) {
      console.error('Error fetching games:', error);
      setGames([]);
      setFilteredGames([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (gamesList, currentFilters) => {
    let filtered = [...gamesList];

    // Platform filter
    if (currentFilters.platform !== 'all') {
      filtered = filtered.filter(game => 
        game.platform && game.platform.toLowerCase().includes(currentFilters.platform.toLowerCase())
      );
    }

    // Price range filter
    if (currentFilters.priceRange !== 'all') {
      const [min, max] = currentFilters.priceRange.split('-').map(p => 
        p === '+' ? Infinity : parseFloat(p)
      );
      filtered = filtered.filter(game => {
        const price = game.price || 0;
        return max === undefined ? price >= min : price >= min && price <= max;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'discount':
          const discountA = a.original_price ? ((a.original_price - a.price) / a.original_price) * 100 : 0;
          const discountB = b.original_price ? ((b.original_price - b.price) / b.original_price) * 100 : 0;
          return discountB - discountA;
        default: // name
          return (a.name || '').localeCompare(b.name || '');
      }
    });

    setFilteredGames(filtered);
    setTotalResults(filtered.length);
  };

  useEffect(() => {
    fetchGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyFilters(games, filters);
  }, [games, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchGames(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        
        <FilterBar 
          onFilterChange={handleFilterChange} 
          totalResults={totalResults}
        />

        {loading ? (
          <div className="loading">Loading games...</div>
        ) : (
          <div className="games-grid">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onAddToCart={(gameName) => showToast(`${gameName} added to cart!`, 'success')}
              />
            ))}
          </div>
        )}

        {!loading && filteredGames.length === 0 && games.length > 0 && (
          <div className="no-results">
            <p>No games match your filters. Try adjusting your search criteria.</p>
          </div>
        )}

        {!loading && games.length === 0 && (
          <div className="no-results">
            <p>No games found. Try a different search term.</p>
          </div>
        )}
      </main>

      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;