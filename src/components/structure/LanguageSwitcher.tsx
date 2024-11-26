import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    // Check for a saved language in localStorage or default to 'en'
    return localStorage.getItem('language') || 'en';
  });

  // Effect to update the language on mount
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage); // Set initial language based on saved state
  }, [selectedLanguage, i18n]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="block bg-zinc-50 dark:bg-zinc-800 text-xs w-full text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="en">🇬🇧 EN</option>
        <option value="uk">🇺🇦 УК</option>
        <option value="pl">🇵🇱 PL</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
