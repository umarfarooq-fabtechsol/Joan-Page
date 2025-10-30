import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
 return (
 <section className="hero-section">
 <div className="hero-container">
 <div className="hero-content">
 <h1 className="hero-title">
 Welcome to <span className="brand-name">Staron AI</span>
 </h1>
 <p className="hero-subtitle">
 Revolutionizing the future with cutting-edge artificial intelligence solutions
 </p>
 <p className="hero-description">
 We build intelligent software that transforms businesses and empowers innovation. 
 From machine learning algorithms to AI-driven automation, Staron AI delivers 
 next-generation technology solutions tailored to your needs.
 </p>
 <div className="hero-buttons">
 <button className="btn btn-primary">Get Started</button>
 <button className="btn btn-secondary">Learn More</button>
 </div>
 </div>
 <div className="hero-visual">
 <div className="ai-visualization">
 <div className="orbit orbit-1"></div>
 <div className="orbit orbit-2"></div>
 <div className="orbit orbit-3"></div>
 <div className="central-node"></div>
 </div>
 </div>
 </div>
 </section>
 );
};

export default HeroSection;