import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Plus, Info, Menu, Command, FileText, BookOpen, Calculator } from 'lucide-react';
import MobileNav from './MobileNav';

export default function Header({ onNewCase }) {
  const location = useLocation();
  const isChat = location.pathname === '/chat';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 premium-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/40 transition-colors">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            <span className="font-display text-2xl text-gold font-semibold tracking-tight">JusticeAI</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-10">
            <NavLink to="/documents" icon={FileText}>Documents</NavLink>
            <NavLink to="/rights" icon={BookOpen}>Rights</NavLink>
            <NavLink to="/estimator" icon={Calculator}>Estimator</NavLink>
            <NavLink to="/samples">Samples</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            {/* Cmd+K Hint */}
            <button
              onClick={() => {
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors cursor-pointer group"
            >
              <Command className="w-3.5 h-3.5 text-text-tertiary group-hover:text-gold transition-colors" />
              <span className="text-[10px] text-text-tertiary group-hover:text-text-secondary transition-colors font-medium">
                Search
              </span>
              <kbd className="text-[9px] text-text-tertiary font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Disclaimer Badge — desktop only */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Info className="w-3.5 h-3.5 text-gold-light" />
              <span className="text-[11px] uppercase tracking-wider text-text-secondary font-medium">Information Only • No Legal Advice</span>
            </div>

            {isChat && (
              <button 
                onClick={onNewCase}
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-void px-4 py-2 rounded-full font-medium transition-all active:scale-95 shadow-lg shadow-gold/20"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Case</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-raised border border-white/10 hover:border-gold/30 transition-colors"
            >
              <Menu className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavLink({ to, children, icon: Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest transition-colors ${
        isActive ? 'text-gold' : 'text-text-tertiary hover:text-gold'
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </Link>
  );
}
