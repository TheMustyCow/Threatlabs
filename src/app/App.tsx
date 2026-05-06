import { useEffect, useMemo, useState } from 'react';
import { Layout, type NavItem } from './components/Layout';
import { Home } from './pages/Home';
import { Threats } from './pages/Threats';
import { Phishing } from './pages/Phishing';
import { NetworksData } from './pages/NetworksData';
import { PasswordLab } from './pages/PasswordLab';
import { TwoFactor } from './pages/TwoFactor';
import { ResourcesReview } from './pages/ResourcesReview';

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/threats', label: 'Threats' },
  { path: '/phishing', label: 'Phishing' },
  { path: '/networks-data', label: 'Networks & Data' },
  { path: '/password-lab', label: 'Password Lab' },
  { path: '/two-factor', label: '2FA' },
  { path: '/resources', label: 'Review' },
];

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const handlePopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [path]);

  const navigate = (nextPath: string) => {
    if (nextPath !== path) {
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  const page = useMemo(() => {
    switch (path) {
      case '/':
        return <Home navigate={navigate} />;
      case '/threats':
        return <Threats />;
      case '/phishing':
        return <Phishing />;
      case '/networks-data':
        return <NetworksData />;
      case '/password-lab':
        return <PasswordLab />;
      case '/two-factor':
        return <TwoFactor />;
      case '/resources':
        return <ResourcesReview />;
      default:
        return <Home navigate={navigate} />;
    }
  }, [path]);

  return (
    <Layout currentPath={path} navItems={navItems} onNavigate={navigate}>
      {page}
    </Layout>
  );
}
