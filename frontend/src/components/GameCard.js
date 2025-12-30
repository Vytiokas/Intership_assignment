import React, { useState } from 'react';
import './GameCard.css';

const GameCard = ({ game, onAddToCart }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const formatPrice = (price) => {
    return `€${price.toFixed(2)}`;
  };

  const getDiscountPercentage = (original, current) => {
    if (!original || original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  // Naudojame backend grąžintą URL arba fallback
  const getGameImage = (gameName, imageUrl) => {
    // Pirmenybė backend URL
    if (imageUrl && imageUrl.trim() !== '') {
      return imageUrl;
    }
    
    // Fallback tik jei backend negrąžino nieko
    if (gameName.includes('FIFA 23')) {
      return 'https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg';
    }
    
    if (gameName.includes('Red Dead Redemption 2')) {
      return 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg';
    }
    
    if (gameName.includes('Split Fiction')) {
      return 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2152580/header.jpg';
    }
    
    // Ultimate fallback
    return 'https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Game+Cover';
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Simuliuojame API kvietimą
    setTimeout(() => {
      setIsAddingToCart(false);
      if (onAddToCart) {
        onAddToCart(game.name);
      }
    }, 1000);
  };

  const discount = getDiscountPercentage(game.original_price, game.price);

  return (
    <div className="game-card">
      <div className="game-image-container">
        <img 
          src={getGameImage(game.name, game.image_url)} 
          alt={game.name}
          className="game-image"
          onError={(e) => {
            // Jei nepavyko užkrauti, naudojame placeholder
            e.target.src = 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Game+Cover';
          }}
        />
        {game.cashback && (
          <div className="cashback-badge">
            GRĮŽTA
          </div>
        )}
        <div className="platform-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {game.platform}
        </div>
      </div>
      
      <div className="game-info">
        <div className="game-content">
          <h3 className="game-title">{game.name}</h3>
          
          <div className="region-badge">
            {game.region}
          </div>
          
          <div className="price-section">
            <div className="price-main-row">
              <div className="current-price">{formatPrice(game.price)}</div>
              <div className="discount-area">
                <span className="original-price">€{game.original_price?.toFixed(2) || (game.price * 1.5).toFixed(2)}</span>
                <span className="discount-percentage">-{discount || 25}%</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          className={`add-to-cart-btn ${isAddingToCart ? 'loading' : ''}`}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <div className="spinner"></div>
              Adding...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
                <path d="M1 1H5L7.68 14.39A2 2 0 0 0 9.65 16H19.4A2 2 0 0 0 21.36 14.39L23 6H6" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              Pirkti
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GameCard;