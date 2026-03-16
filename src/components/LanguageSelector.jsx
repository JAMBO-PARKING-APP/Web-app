import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'pt', label: 'Português' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'ha', label: 'Hausa' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'zu', label: 'isiZulu' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef} style={{ position: 'relative' }}>
      <button 
        className="lang-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '6px 12px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s'
        }}
      >
        <Languages size={16} />
        <span>{currentLanguage.label}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div 
          className="lang-dropdown glass-card shadow-lg" 
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '180px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            padding: '8px',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                display: 'flex',
                width: '100%',
                padding: '8px 12px',
                border: 'none',
                background: i18n.language === lang.code ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: i18n.language === lang.code ? 'var(--accent-light)' : 'var(--text-primary)',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: i18n.language === lang.code ? 600 : 400,
                marginBottom: '2px'
              }}
              onMouseEnter={(e) => {
                if (i18n.language !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                if (i18n.language !== lang.code) e.currentTarget.style.background = 'transparent';
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
