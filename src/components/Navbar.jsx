import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Navbar({ showLinks = true, backLink = false }) {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/logo.png" alt="Space Park" style={{ height: 38, objectFit: 'contain' }} />
        <span>{t('navbar.logo')}</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {showLinks && (
          <div className="navbar-links">
            <Link to="/how-it-works">{t('navbar.howItWorks')}</Link>
            <a href="#benefits">{t('navbar.benefits')}</a>
            <a href="#download">{t('navbar.getApp')}</a>
            <Link to="/status">{t('navbar.checkStatus')}</Link>
            <Link to="/login" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{t('navbar.partnerLogin')}</Link>
          </div>
        )}
        
        {backLink && (
          <Link to="/" className="btn-secondary" style={{ padding: '8px 20px', fontSize: 13 }}>
            {t('navbar.backToHome')}
          </Link>
        )}

        <LanguageSelector />
      </div>
    </nav>
  );
}
