import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

/* ── Shared Legal Layout ── */
export function LegalLayout({ title, children }) {
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Space Park" style={{ height: 36, objectFit: 'contain' }} />
          <span>{t('navbar.logo')}</span>
        </Link>
        <div className="navbar-links" style={{ gap: 20 }}>
          <LanguageSelector />
          <Link to="/" className="btn-secondary" style={{ padding: '8px 20px', fontSize: 13 }}>{t('navbar.backToHome')}</Link>
        </div>
      </nav>
      <div style={{ minHeight: '100vh', paddingTop: 80 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px' }}>
          <div className="glass-card" style={{ padding: '48px' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-light)', marginBottom: 10 }}>{title}</h3>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export function PrivacyContent() {
  const { t } = useTranslation();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>{t('legal.privacy.title')}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 40 }}>{t('legal.privacy.date')}</p>

      <Section title={t('legal.privacy.s1.title')}>
        {t('legal.privacy.s1.content')}
      </Section>
      <Section title={t('legal.privacy.s2.title')}>
        <ul style={{ paddingLeft: 20 }}>
          {[1, 2, 3, 4, 5, 6, 7].map(num => <li key={num} style={{ marginBottom: 6 }}>{t(`legal.privacy.s2.item${num}`)}</li>)}
        </ul>
      </Section>
      <Section title={t('legal.privacy.s3.title')}>
        <ul style={{ paddingLeft: 20 }}>
          {[1, 2, 3, 4, 5, 6, 7].map(num => <li key={num} style={{ marginBottom: 6 }}>{t(`legal.privacy.s3.item${num}`)}</li>)}
        </ul>
      </Section>
      <Section title={t('legal.privacy.s4.title')}>
        {t('legal.privacy.s4.content')}
      </Section>
      <Section title={t('legal.privacy.s5.title')}>
        <ul style={{ paddingLeft: 20 }}>
          {[1, 2, 3, 4].map(num => <li key={num} style={{ marginBottom: 6 }}>{t(`legal.privacy.s5.item${num}`)}</li>)}
        </ul>
      </Section>
      <Section title={t('legal.privacy.s6.title')}>
        <ul style={{ paddingLeft: 20 }}>
          {[1, 2, 3, 4, 5].map(num => <li key={num} style={{ marginBottom: 6 }}>{t(`legal.privacy.s6.item${num}`)}</li>)}
        </ul>
      </Section>
      <Section title={t('legal.privacy.s7.title')}>
        {t('legal.privacy.s7.content')}
      </Section>
      <Section title={t('legal.privacy.s8.title')}>
        {t('legal.privacy.s8.emailLabel')}: <a href="mailto:support@spacepark.com" style={{ color: 'var(--accent-light)' }}>support@spacepark.com</a><br />
        {t('legal.privacy.s8.phoneLabel')}: +256 700 000 000
      </Section>

      <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
        {t('legal.privacy.consent')}
      </div>
    </>
  );
}

export function TermsContent() {
  const { t } = useTranslation();
  return (
    <>
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>{t('legal.terms.title')}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 40 }}>{t('legal.terms.date')}</p>

      <Section title={t('legal.terms.s1.title')}>
        {t('legal.terms.s1.content')}
      </Section>
      <Section title={t('legal.terms.s2.title')}>
        <ul style={{ paddingLeft: 20 }}>
          {[1, 2, 3, 4].map(num => <li key={num} style={{ marginBottom: 6 }}>{t(`legal.terms.s2.item${num}`)}</li>)}
        </ul>
      </Section>
      <Section title={t('legal.terms.s3.title')}>
        <ul style={{ paddingLeft: 20 }}>
          {[1, 2, 3].map(num => <li key={num} style={{ marginBottom: 6 }}>{t(`legal.terms.s3.item${num}`)}</li>)}
        </ul>
      </Section>
      <Section title={t('legal.terms.s4.title')}>
        {t('legal.terms.s4.content')}
      </Section>
      <Section title={t('legal.terms.s5.title')}>
        <ul style={{ paddingLeft: 20 }}>
          {[1, 2, 3, 4].map(num => <li key={num} style={{ marginBottom: 6 }}>{t(`legal.terms.s5.item${num}`)}</li>)}
        </ul>
      </Section>
      <Section title={t('legal.terms.s6.title')}>
        {t('legal.terms.s6.content')}
      </Section>
      <Section title={t('legal.terms.s7.title')}>
        {t('legal.terms.s7.content')}
      </Section>
      <Section title={t('legal.terms.s8.title')}>
        {t('legal.terms.s8.content')}
      </Section>
      <Section title={t('legal.terms.s9.title')}>
        {t('legal.terms.s9.content')}
      </Section>
      <Section title={t('legal.terms.s10.title')}>
        {t('legal.terms.s10.content')}
      </Section>

      <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, textAlign: 'center', fontWeight: 600 }}>
        {t('legal.terms.agreement')}
      </div>
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>{t('legal.terms.compliance')}</p>
    </>
  );
}
