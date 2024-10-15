"use client";
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(`/${newLocale}`);
  };

  return (
    <div>
      <select value={locale} onChange={changeLanguage}>
        <option value="en">{t('english')}</option>
        <option value="fr">{t('french')}</option>
        <option value="es">{t('spanish')}</option>
      </select>
    </div>
  );
}
