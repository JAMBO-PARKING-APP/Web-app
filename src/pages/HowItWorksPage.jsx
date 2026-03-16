import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Hourglass, CheckCircle2, Landmark, BarChart3, Banknote } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

function StepCard({ num, icon, title, desc }) {
  const { t } = useTranslation();
  return (
    <div className="glass-card" style={{ padding: 32, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg,var(--accent),#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, color: '#fff' }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{t('common.step')} {num}</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{desc}</p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Space Park" style={{ height: 36, objectFit: 'contain' }} />
          <span>{t('navbar.logo')}</span>
        </Link>
        <div className="navbar-links">
          <Link to="/apply">{t('navbar.howItWorks')}</Link>
          <Link to="/login" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{t('navbar.partnerLogin')}</Link>
          <LanguageSelector />
        </div>
      </nav>

      <div style={{ minHeight: '100vh', paddingTop: 80, background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-eyebrow">{t('howItWorks.programme')}</p>
            <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, marginBottom: 16 }}>{t('howItWorks.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 64 }}>
            <StepCard num={1} icon={<FileText size={24} />} title={t('howItWorks.steps.1.title')} desc={t('howItWorks.steps.1.desc')} />
            <StepCard num={2} icon={<Hourglass size={24} />} title={t('howItWorks.steps.2.title')} desc={t('howItWorks.steps.2.desc')} />
            <StepCard num={3} icon={<CheckCircle2 size={24} />} title={t('howItWorks.steps.3.title')} desc={t('howItWorks.steps.3.desc')} />
            <StepCard num={4} icon={<Landmark size={24} />} title={t('howItWorks.steps.4.title')} desc={t('howItWorks.steps.4.desc')} />
            <StepCard num={5} icon={<BarChart3 size={24} />} title={t('howItWorks.steps.5.title')} desc={t('howItWorks.steps.5.desc')} />
            <StepCard num={6} icon={<Banknote size={24} />} title={t('howItWorks.steps.6.title')} desc={t('howItWorks.steps.6.desc')} />
          </div>

          {/* FAQ */}
          <div className="glass-card" style={{ padding: 40, marginBottom: 40 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 32 }}>{t('howItWorks.faq.title')}</h2>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20, marginBottom: 20 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{t(`howItWorks.faq.q${n}`)}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>{t(`howItWorks.faq.a${n}`)}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/apply" className="btn-primary" style={{ fontSize: 17, padding: '16px 40px' }}>
              <span>{t('howItWorks.applyBtn')}</span><span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
