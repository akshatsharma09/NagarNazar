import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `font-display font-bold text-sm uppercase transition-all relative group ${isActive ? 'text-white' : 'text-zinc-300 hover:text-white hover:scale-105'}`;
  };

  const getSpanClass = (path) => {
    const isActive = location.pathname === path;
    return `absolute -bottom-1 left-0 h-1 bg-yellow-400 transition-all duration-300 shadow-[0_0_10px_rgba(250,204,21,0.5)] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`;
  };

  return (
    <div className="w-full flex justify-center px-4 relative z-50">
      <nav className="flex justify-between items-center px-6 py-3 max-w-7xl w-full bg-[#111827]/90 backdrop-blur-md rounded-full border border-white/10 mt-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
        <Link to="/" className="text-2xl font-black tracking-tighter uppercase text-yellow-400 italic drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
          NagarNazar
        </Link>
        <div className="hidden md:flex gap-6 items-center bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
          <Link className={getLinkClass('/dashboard')} to="/dashboard">
            Dashboard
            <span className={getSpanClass('/dashboard')}></span>
          </Link>
          <Link className={getLinkClass('/reports')} to="/reports">
            Reports
            <span className={getSpanClass('/reports')}></span>
          </Link>
          <Link className={getLinkClass('/maintenance')} to="/maintenance">
            Maintenance
            <span className={getSpanClass('/maintenance')}></span>
          </Link>
          <Link className={getLinkClass('/pricing')} to="/pricing">
            Plans
            <span className={getSpanClass('/pricing')}></span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;