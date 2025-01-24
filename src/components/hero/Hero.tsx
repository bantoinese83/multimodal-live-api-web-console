import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="hero hero--map gps-bg">
      <div className="gps-bg__guts">
        <div className="gps-bg__bg"></div>
        <div className="gps-bg__route"></div>
        <div className="gps-bg__marker"></div>
      </div>
      <div className="gps-bg__fade"></div>
      <h1 className="hero__title">
      </h1>


    </header>
  );
};

export default Hero;