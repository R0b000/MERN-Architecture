import React from 'react';
import { Link } from 'react-router-dom';
import { useHome } from './Home.logic';
import { Banner } from '../../components/Banner/Banner';
import { Button } from 'shared-ui/components/Button/Button';
import './Home.css';

export const Home: React.FC = () => {
  const { featuredProducts, newArrivals, loading, error } = useHome();

  if (loading) {
    return (
      <div className="home-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="home-error">{error}</div>;
  }

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-section">
        <Banner position="home" />
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products?featured=true">
            <Button variant="secondary">View All</Button>
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="product-card">
              <div className="product-image">
                <img src={product.images[0]} alt={product.name} />
                {product.salePrice && (
                  <span className="sale-badge">Sale</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  {product.salePrice ? (
                    <>
                      <span className="current-price">${product.salePrice.toFixed(2)}</span>
                      <span className="original-price">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="current-price">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="product-rating">
                  ⭐ {product.rating.toFixed(1)} ({product.reviewCount})
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <Link to="/products?sort=newest">
            <Button variant="secondary">View All</Button>
          </Link>
        </div>
        <div className="products-grid">
          {newArrivals.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="product-card">
              <div className="product-image">
                <img src={product.images[0]} alt={product.name} />
                {product.stock === 0 && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  {product.salePrice ? (
                    <>
                      <span className="current-price">${product.salePrice.toFixed(2)}</span>
                      <span className="original-price">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="current-price">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="product-rating">
                  ⭐ {product.rating.toFixed(1)} ({product.reviewCount})
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
