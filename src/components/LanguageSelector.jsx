import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSelector.css';

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', label: t('lang.en', 'English') },
    { code: 'es', label: t('lang.es', 'Español') },
    { code: 'fr', label: t('lang.fr', 'Français') },
  ];

  return (
    <div className="language-selector">
      <button onClick={toggleDropdown} className="lang-btn">
        <Globe size={18} />
        <span>{i18n.resolvedLanguage?.toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((lng) => (
            <button
              key={lng.code}
              className={`lang-option ${i18n.resolvedLanguage === lng.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lng.code)}
            >
              {lng.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
