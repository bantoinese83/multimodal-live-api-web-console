import React from 'react';
import { Route } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Route size={48} />
      </div>
    <h1 className="app-name">NAVUE</h1>
    </header>
  );
};

export default Header;