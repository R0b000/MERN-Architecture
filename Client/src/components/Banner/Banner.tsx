import React from 'react';
import { useBanners } from './Banner.logic';
import './Banner.css';

interface BannerProps {
  position?: string;
}

export const Banner: React.FC<BannerProps> = ({ position = 'home' }) => {
  const { banners, loading, error } = useBanners(position);

  if (loading) {
    return (
      <div className="banner-container">
        <div className="banner-loading">Loading...</div>
      </div>
    );
  }

  if (error || !banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="banner-container">
      {banners.map((banner) => (
        <a
          key={banner._id}
          href={banner.linkUrl}
          className="banner-item"
          style={{ backgroundImage: `url(${banner.imageUrl})` }}
        >
          <div className="banner-overlay">
            <div className="banner-content">
              <h2 className="banner-title">{banner.title}</h2>
              {banner.subtitle && (
                <h3 className="banner-subtitle">{banner.subtitle}</h3>
              )}
              {banner.description && (
                <p className="banner-description">{banner.description}</p>
              )}
              {banner.linkText && (
                <button className="banner-button">{banner.linkText}</button>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
