import { Menu, Moon, ShieldCheck, Sun, X } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';

export type NavItem = {
  path: string;
  label: string;
};

type LayoutProps = {
  children: ReactNode;
  currentPath: string;
  navItems: NavItem[];
  onNavigate: (path: string) => void;
};

export function Layout({ children, currentPath, navItems, onNavigate }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('threat-labs-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('threat-labs-theme', theme);
  }, [theme]);

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a
          className="brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            handleNavigate('/');
          }}
          aria-label="Threat Labs home"
        >
          <span className="brand-mark" aria-hidden="true">
            <ShieldCheck size={19} />
          </span>
          <span>Threat Labs</span>
        </a>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (currentPath === '' && item.path === '/');

            return (
              <a
                key={item.path}
                className={isActive ? 'nav-link is-active' : 'nav-link'}
                href={item.path}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(item.path);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <strong>Threat Labs</strong>
          <p>Practical cybersecurity lessons for everyday decisions.</p>
        </div>
        <p className="footer-note">All labs run locally in your browser. No accounts.</p>
      </footer>
    </div>
  );
}
