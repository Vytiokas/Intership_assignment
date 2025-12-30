import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              {/* Eneba logo su spalvotais elementais */}
              <defs>
                <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
                <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF69B4" />
                  <stop offset="100%" stopColor="#FF1493" />
                </linearGradient>
                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF7F" />
                  <stop offset="100%" stopColor="#00CED1" />
                </linearGradient>
              </defs>
              
              {/* Žalias elementas */}
              <path d="M15 45 Q25 35 40 40 Q55 45 60 60 Q55 75 40 70 Q25 65 15 55 Z" fill="url(#greenGrad)" />
              
              {/* Geltonas elementas */}
              <path d="M25 15 Q35 10 50 20 Q65 30 70 45 Q65 50 50 45 Q35 40 25 30 Z" fill="url(#yellowGrad)" />
              
              {/* Rožinis elementas */}
              <path d="M55 25 Q70 20 80 35 Q85 50 75 65 Q65 70 55 60 Q50 45 55 30 Z" fill="url(#pinkGrad)" />
            </svg>
          </div>
          <span className="logo-text">eneba</span>
        </div>
        <nav className="nav">
          <span className="nav-item">Games, Gift Cards, Top-Ups & More | Best Deals</span>
        </nav>
        <div className="header-actions">
          <span className="region">English EU | EUR</span>
          <div className="user-actions">
            <button className="wishlist-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button className="cart-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
                <path d="M1 1H5L7.68 14.39A2 2 0 0 0 9.65 16H19.4A2 2 0 0 0 21.36 14.39L23 6H6" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
            <button className="profile-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;